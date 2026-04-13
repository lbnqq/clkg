/**
 * 疯狂动物城数据持久化增强
 * Zootopia Data Persistence - 数据同步、导入导出、备份恢复
 */

(function() {
  'use strict';

  // ==================== 配置 ====================
  const StorageConfig = {
    // 存储前缀
    prefix: 'zt_',

    // 自动保存
    autoSave: true,
    autoSaveInterval: 30000, // 30秒

    // 数据版本
    version: '2.2.0',

    // 备份配置
    backup: {
      enabled: true,
      maxBackups: 5,
      storageKey: 'zt_backups'
    },

    // 同步配置
    sync: {
      enabled: false, // 可选的云端同步
      endpoint: null
    }
  };

  // ==================== 数据管理器 ====================
  const DataManager = {
    data: {},
    listeners: new Map(),
    autoSaveTimer: null,

    init: function() {
      this.loadAll();
      this.setupAutoSave();
      this.migrateData();
    },

    // 加载所有数据
    loadAll: function() {
      const keys = Object.keys(localStorage);

      keys.forEach(key => {
        if (key.startsWith(StorageConfig.prefix)) {
          try {
            const value = localStorage.getItem(key);
            this.data[key] = JSON.parse(value);
          } catch (e) {
            console.warn(`加载数据失败: ${key}`, e);
          }
        }
      });

      console.log('💾 数据加载完成:', Object.keys(this.data).length, '项');
    },

    // 保存数据
    save: function(key, value, options = {}) {
      const fullKey = StorageConfig.prefix + key;

      try {
        // 添加元数据
        const dataWithMeta = {
          value: value,
          meta: {
            version: StorageConfig.version,
            timestamp: Date.now(),
            checksum: this.checksum(JSON.stringify(value))
          }
        };

        // 保存到 localStorage
        localStorage.setItem(fullKey, JSON.stringify(dataWithMeta));

        // 更新缓存
        this.data[fullKey] = dataWithMeta;

        // 触发变更事件
        this.notifyListeners(key, value);

        // 创建备份
        if (StorageConfig.backup.enabled && options.backup !== false) {
          this.createBackup(key, value);
        }

        return true;
      } catch (e) {
        console.error('保存数据失败:', key, e);
        return false;
      }
    },

    // 加载数据
    load: function(key, defaultValue = null) {
      const fullKey = StorageConfig.prefix + key;

      try {
        const item = localStorage.getItem(fullKey);

        if (!item) {
          return defaultValue;
        }

        const data = JSON.parse(item);

        // 验证数据完整性
        if (this.validate(data)) {
          return data.value;
        } else {
          console.warn(`数据损坏: ${key}`);
          return defaultValue;
        }
      } catch (e) {
        console.error('加载数据失败:', key, e);
        return defaultValue;
      }
    },

    // 删除数据
    remove: function(key) {
      const fullKey = StorageConfig.prefix + key;

      try {
        localStorage.removeItem(fullKey);
        delete this.data[fullKey];
        this.notifyListeners(key, null);
        return true;
      } catch (e) {
        console.error('删除数据失败:', key, e);
        return false;
      }
    },

    // 验证数据
    validate: function(data) {
      if (!data || typeof data !== 'object') return false;
      if (!data.meta) return true; // 旧数据格式
      return data.meta.checksum === this.checksum(JSON.stringify(data.value));
    },

    // 计算校验和
    checksum: function(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return hash.toString(36);
    },

    // 数据迁移
    migrateData: function() {
      const versionKey = StorageConfig.prefix + 'data_version';
      const currentVersion = this.load(versionKey, '1.0.0');

      if (currentVersion !== StorageConfig.version) {
        console.log('🔄 开始数据迁移:', currentVersion, '→', StorageConfig.version);

        // 执行迁移
        this.runMigrations(currentVersion);

        // 更新版本号
        this.save(versionKey, StorageConfig.version);
      }
    },

    // 运行迁移
    runMigrations: function(fromVersion) {
      const migrations = {
        '1.0.0': () => {
          // 迁移到 2.0.0
          const oldStats = localStorage.getItem('zt_gameStats');
          if (oldStats) {
            this.save('gameStats', JSON.parse(oldStats));
            localStorage.removeItem('zt_gameStats');
          }
        },

        '2.0.0': () => {
          // 迁移到 2.1.0
          // 添加新的数据结构
        },

        '2.1.0': () => {
          // 迁移到 2.2.0
          // 重新组织数据结构
        }
      };

      // 执行所有需要的迁移
      const versions = Object.keys(migrations).sort();
      for (const version of versions) {
        if (version > fromVersion) {
          try {
            migrations[version]();
          } catch (e) {
            console.error(`迁移失败 ${version}:`, e);
          }
        }
      }
    },

    // 设置自动保存
    setupAutoSave: function() {
      if (!StorageConfig.autoSave) return;

      this.autoSaveTimer = setInterval(() => {
        this.autoSave();
      }, StorageConfig.autoSaveInterval);
    },

    // 自动保存脏数据
    autoSave: function() {
      // 保存需要持久化的数据
      const keysToSave = [
        'gameStats',
        'musicVolume',
        'musicMode',
        'theme'
      ];

      keysToSave.forEach(key => {
        const value = this.data[StorageConfig.prefix + key];
        if (value && value.meta) {
          // 重新保存以更新元数据
          this.save(key, value.value);
        }
      });
    },

    // 监听数据变更
    onChange: function(key, callback) {
      if (!this.listeners.has(key)) {
        this.listeners.set(key, []);
      }
      this.listeners.get(key).push(callback);
    },

    // 通知监听器
    notifyListeners: function(key, value) {
      const callbacks = this.listeners.get(key);
      if (callbacks) {
        callbacks.forEach(cb => {
          try {
            cb(value, key);
          } catch (e) {
            console.error('监听器错误:', key, e);
          }
        });
      }
    },

    // 获取所有数据
    getAll: function() {
      const result = {};

      Object.keys(this.data).forEach(key => {
        const name = key.replace(StorageConfig.prefix, '');
        result[name] = this.data[key].value;
      });

      return result;
    },

    // 清空所有数据
    clear: function(excludeKeys = []) {
      const keys = Object.keys(localStorage);

      keys.forEach(key => {
        if (key.startsWith(StorageConfig.prefix)) {
          const name = key.replace(StorageConfig.prefix, '');

          if (!excludeKeys.includes(name)) {
            localStorage.removeItem(key);
            delete this.data[key];
          }
        }
      });

      console.log('🗑️ 数据已清空');
    }
  };

  // ==================== 备份管理器 ====================
  const BackupManager = {
    init: function() {
      this.loadBackups();
      this.cleanupOldBackups();
    },

    // 创建备份
    createBackup: function(key, value) {
      const backups = this.loadBackups();

      const backup = {
        key: key,
        value: value,
        timestamp: Date.now(),
        version: StorageConfig.version
      };

      backups.push(backup);

      // 限制备份数量
      if (backups.length > StorageConfig.backup.maxBackups) {
        backups.shift();
      }

      this.saveBackups(backups);
    },

    // 加载备份
    loadBackups: function() {
      try {
        const data = localStorage.getItem(StorageConfig.backup.storageKey);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    },

    // 保存备份
    saveBackups: function(backups) {
      try {
        localStorage.setItem(
          StorageConfig.backup.storageKey,
          JSON.stringify(backups)
        );
      } catch (e) {
        console.error('保存备份失败:', e);
      }
    },

    // 清理旧备份
    cleanupOldBackups: function() {
      const backups = this.loadBackups();
      const now = Date.now();
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7天

      const filtered = backups.filter(b => {
        return now - b.timestamp < maxAge;
      });

      if (filtered.length !== backups.length) {
        this.saveBackups(filtered);
      }
    },

    // 恢复备份
    restore: function(timestamp) {
      const backups = this.loadBackups();
      const backup = backups.find(b => b.timestamp === timestamp);

      if (backup) {
        DataManager.save(backup.key, backup.value);
        return true;
      }

      return false;
    }
  };

  // ==================== 导入导出管理器 ====================
  const ImportExportManager = {
    // 导出数据
    export: function(keys = null) {
      const data = keys
        ? this.exportKeys(keys)
        : DataManager.getAll();

      const exportData = {
        version: StorageConfig.version,
        timestamp: Date.now(),
        data: data
      };

      return JSON.stringify(exportData, null, 2);
    },

    // 导出指定键
    exportKeys: function(keys) {
      const result = {};

      keys.forEach(key => {
        result[key] = DataManager.load(key);
      });

      return result;
    },

    // 导出为文件
    exportToFile: function(filename = null) {
      const data = this.export();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename || `zootopia-backup-${Date.now()}.json`;
      a.click();

      URL.revokeObjectURL(url);

      console.log('📤 数据已导出');
    },

    // 导入数据
    import: function(jsonString) {
      try {
        const importData = JSON.parse(jsonString);

        // 验证格式
        if (!importData.data) {
          throw new Error('无效的导入格式');
        }

        // 导入数据
        Object.entries(importData.data).forEach(([key, value]) => {
          DataManager.save(key, value, { backup: false });
        });

        console.log('📥 数据导入完成');

        return {
          success: true,
          imported: Object.keys(importData.data).length
        };
      } catch (e) {
        console.error('导入失败:', e);
        return {
          success: false,
          error: e.message
        };
      }
    },

    // 从文件导入
    importFromFile: function(file, callback) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = this.import(e.target.result);
        if (callback) callback(result);
      };

      reader.onerror = () => {
        const result = {
          success: false,
          error: '文件读取失败'
        };
        if (callback) callback(result);
      };

      reader.readAsText(file);
    }
  };

  // ==================== 同步管理器 ====================
  const SyncManager = {
    // 本地数据状态
    localState: {},

    // 更新本地状态
    updateLocalState: function() {
      this.localState = {
        timestamp: Date.now(),
        data: DataManager.getAll()
      };
    },

    // 同步到云端（预留）
    syncToCloud: async function() {
      if (!StorageConfig.sync.enabled || !StorageConfig.sync.endpoint) {
        console.warn('云端同步未配置');
        return false;
      }

      try {
        this.updateLocalState();

        const response = await fetch(StorageConfig.sync.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.localState)
        });

        return response.ok;
      } catch (e) {
        console.error('同步失败:', e);
        return false;
      }
    },

    // 从云端同步（预留）
    syncFromCloud: async function() {
      if (!StorageConfig.sync.enabled || !StorageConfig.sync.endpoint) {
        console.warn('云端同步未配置');
        return false;
      }

      try {
        const response = await fetch(StorageConfig.sync.endpoint);
        const cloudData = await response.json();

        // 合并数据
        Object.entries(cloudData.data).forEach(([key, value]) => {
          DataManager.save(key, value, { backup: false });
        });

        return true;
      } catch (e) {
        console.error('同步失败:', e);
        return false;
      }
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.storage = DataManager;
  ZootopiaCore.backup = BackupManager;
  ZootopiaCore.importExport = ImportExportManager;
  ZootopiaCore.sync = SyncManager;
  ZootopiaCore.storageConfig = StorageConfig;

  // ==================== 全局 API ====================
  // 保存数据
  window.ztSave = (key, value) => DataManager.save(key, value);

  // 加载数据
  window.ztLoad = (key, defaultValue) => DataManager.load(key, defaultValue);

  // 删除数据
  window.ztRemove = (key) => DataManager.remove(key);

  // 导出数据
  window.ztExport = () => ImportExportManager.exportToFile();

  // 导入数据
  window.ztImport = (jsonString) => ImportExportManager.import(jsonString);

  // 清空数据
  window.ztClearStorage = (excludeKeys) => DataManager.clear(excludeKeys);

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    DataManager.init();
    BackupManager.init();

    console.log('💾 数据持久化系统已就绪');
  });

})();
