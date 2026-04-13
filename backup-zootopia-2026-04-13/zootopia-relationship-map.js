/**
 * 疯狂动物城主题 - 角色关系图系统
 * Zootopia Theme - Character Relationship Map
 * 展示角色之间的关系和互动
 */

(function() {
  'use strict';

  // 角色数据
  const characters = {
    judy: {
      id: 'judy',
      name: 'Judy Hopps',
      nameCn: '朱迪·霍普斯',
      emoji: '🐰',
      color: '#A17F68',
      x: 400,
      y: 300,
      size: 60,
      role: '主角'
    },
    nick: {
      id: 'nick',
      name: 'Nick Wilde',
      nameCn: '尼克·王尔德',
      emoji: '🦊',
      color: '#E67E22',
      x: 550,
      y: 300,
      size: 60,
      role: '主角'
    },
    flash: {
      id: 'flash',
      name: 'Flash',
      nameCn: '闪电',
      emoji: '🐢',
      color: '#27AE60',
      x: 300,
      y: 150,
      size: 45,
      role: '配角'
    },
    bogo: {
      id: 'bogo',
      name: 'Chief Bogo',
      nameCn: '博戈局长',
      emoji: '🦬',
      color: '#2C3E50',
      x: 250,
      y: 350,
      size: 55,
      role: '上司'
    },
    clawhauser: {
      id: 'clawhauser',
      name: 'Benjamin',
      nameCn: '本杰明',
      emoji: '🦆',
      color: '#3498DB',
      x: 200,
      y: 250,
      size: 45,
      role: '同事'
    },
    bellwether: {
      id: 'bellwether',
      name: 'Bellwether',
      nameCn: '绵羊副市长',
      emoji: '🐑',
      color: '#95A5A6',
      x: 500,
      y: 150,
      size: 50,
      role: '反派'
    },
    lionheart: {
      id: 'lionheart',
      name: 'Lionheart',
      nameCn: '狮子市长',
      emoji: '🦁',
      color: '#D35400',
      x: 550,
      y: 450,
      size: 55,
      role: '市长'
    },
    finnick: {
      id: 'finnick',
      name: 'Finnick',
      nameCn: '芬尼克',
      emoji: '🦊',
      color: '#C0392B',
      x: 650,
      y: 250,
      size: 40,
      role: '朋友'
    },
    yax: {
      id: 'yax',
      name: 'Yax',
      nameCn: '雅克斯',
      emoji: '🦛',
      color: '#8B4513',
      x: 150,
      y: 450,
      size: 45,
      role: '线索'
    },
    mrbig: {
      id: 'mrbig',
      name: 'Mr Big',
      nameCn: '大米先生',
      emoji: '🐭',
      color: '#2C3E50',
      x: 400,
      y: 500,
      size: 35,
      role: '黑帮'
    },
    stuart: {
      id: 'stuart',
      name: 'Stu Hopps',
      nameCn: '斯图·霍普斯',
      emoji: '🐰',
      color: '#D4A574',
      x: 150,
      y: 100,
      size: 40,
      role: '家人'
    },
    bonnie: {
      id: 'bonnie',
      name: 'Bonnie Hopps',
      nameCn: '邦妮·霍普斯',
      emoji: '🐰',
      color: '#D4A574',
      x: 250,
      y: 80,
      size: 40,
      role: '家人'
    }
  };

  // 关系数据
  const relationships = [
    { from: 'judy', to: 'nick', type: 'partner', label: '搭档', strength: 5 },
    { from: 'judy', to: 'bogo', type: 'boss', label: '上司', strength: 3 },
    { from: 'judy', to: 'flash', type: 'acquaintance', label: 'DMV', strength: 2 },
    { from: 'judy', to: 'clawhauser', type: 'friend', label: '同事', strength: 3 },
    { from: 'judy', to: 'bellwether', type: 'enemy', label: '敌人', strength: 4 },
    { from: 'judy', to: 'yax', type: 'informant', label: '线索', strength: 2 },
    { from: 'judy', to: 'mrbig', type: 'ally', label: '盟友', strength: 3 },
    { from: 'judy', to: 'stuart', type: 'family', label: '父亲', strength: 4 },
    { from: 'judy', to: 'bonnie', type: 'family', label: '母亲', strength: 4 },
    { from: 'nick', to: 'finnick', type: 'partner', label: '伙伴', strength: 4 },
    { from: 'nick', to: 'finnick', type: 'business', label: '生意', strength: 3 },
    { from: 'bellwether', to: 'lionheart', type: 'subordinate', label: '下属', strength: 2 },
    { from: 'bogo', to: 'clawhauser', type: 'boss', label: '上司', strength: 3 },
    { from: 'lionheart', to: 'bellwether', type: 'boss', label: '上司', strength: 2 },
    { from: 'mrbig', to: 'nick', type: 'debtor', label: '欠债', strength: 2 }
  ];

  // 关系类型配置
  const relationshipTypes = {
    partner: { color: '#E74C3C', width: 4, label: '搭档', icon: '🤝' },
    boss: { color: '#3498DB', width: 2, label: '上司', icon: '👔' },
    family: { color: '#2ECC71', width: 3, label: '家人', icon: '👨‍👩‍👧' },
    friend: { color: '#9B59B6', width: 2, label: '朋友', icon: '💜' },
    enemy: { color: '#E74C3C', width: 3, label: '敌人', icon: '⚔️', dash: true },
    ally: { color: '#F39C12', width: 2, label: '盟友', icon: '🤝' },
    acquaintance: { color: '#95A5A6', width: 1, label: '相识', icon: '👋' },
    informant: { color: '#1ABC9C', width: 2, label: '线人', icon: '💡' },
    business: { color: '#D35400', width: 2, label: '生意', icon: '💰' },
    subordinate: { color: '#3498DB', width: 2, label: '下属', icon: '📋' },
    debtor: { color: '#E74C3C', width: 2, label: '债务', icon: '💸' }
  };

  // 创建关系图
  function createRelationshipMap() {
    const map = document.createElement('div');
    map.className = 'relationship-map-container';
    map.innerHTML = `
      <div class="map-overlay" onclick="this.closest('.relationship-map-container').remove()"></div>
      <div class="map-content">
        <div class="map-header">
          <h2>🎭 动物城角色关系图</h2>
          <button class="map-close">×</button>
        </div>
        <div class="map-canvas-container">
          <svg class="map-canvas" viewBox="0 0 800 600" id="relationshipSvg">
            <!-- 关系线 -->
            ${relationships.map(rel => {
              const from = characters[rel.from];
              const to = characters[rel.to];
              const type = relationshipTypes[rel.type];
              return `
                <line
                  class="relationship-line"
                  data-from="${rel.from}"
                  data-to="${rel.to}"
                  x1="${from.x}"
                  y1="${from.y}"
                  x2="${to.x}"
                  y2="${to.y}"
                  stroke="${type.color}"
                  stroke-width="${type.width}"
                  ${type.dash ? 'stroke-dasharray="10,5"' : ''}
                  opacity="${0.3 + rel.strength * 0.14}"
                />
                <text
                  class="relationship-label"
                  x="${(from.x + to.x) / 2}"
                  y="${(from.y + to.y) / 2}"
                  fill="${type.color}"
                  font-size="12"
                  text-anchor="middle"
                >${type.icon} ${rel.label}</text>
              `;
            }).join('')}

            <!-- 角色节点 -->
            ${Object.values(characters).map(char => `
              <g class="character-node" data-character="${char.id}" transform="translate(${char.x}, ${char.y})">
                <circle
                  r="${char.size}"
                  fill="${char.color}"
                  opacity="0.8"
                  class="character-circle"
                />
                <text
                  text-anchor="middle"
                  dominant-baseline="middle"
                  font-size="${char.size * 0.8}"
                >${char.emoji}</text>
                <text
                  y="${char.size + 20}"
                  text-anchor="middle"
                  fill="#2D3436"
                  font-size="14"
                  font-weight="bold"
                >${char.nameCn}</text>
                <text
                  y="${char.size + 35}"
                  text-anchor="middle"
                  fill="#636E72"
                  font-size="10"
                >${char.role}</text>
              </g>
            `).join('')}
          </svg>
        </div>

        <!-- 角色详情面板 -->
        <div class="character-details" id="characterDetails">
          <div class="details-placeholder">
            <span class="placeholder-icon">👆</span>
            <span class="placeholder-text">点击角色查看详情</span>
          </div>
        </div>

        <!-- 图例 -->
        <div class="map-legend">
          <h3>关系类型</h3>
          <div class="legend-items">
            ${Object.entries(relationshipTypes).map(([key, type]) => `
              <div class="legend-item">
                <div class="legend-line" style="background: ${type.color}; height: ${type.width}px; ${type.dash ? 'background: repeating-linear-gradient(90deg, ' + type.color + ' 0px, ' + type.color + ' 5px, transparent 5px, transparent 10px);' : ''}"></div>
                <span class="legend-label">${type.icon} ${type.label}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    return map;
  }

  // 显示角色详情
  function showCharacterDetails(characterId) {
    const char = characters[characterId];
    if (!char) return;

    // 查找相关角色
    const related = relationships.filter(rel =>
      rel.from === characterId || rel.to === characterId
    );

    const detailsPanel = document.getElementById('characterDetails');
    if (!detailsPanel) return;

    detailsPanel.innerHTML = `
      <div class="details-content">
        <div class="details-header">
          <span class="details-emoji" style="font-size: 48px;">${char.emoji}</span>
          <div class="details-info">
            <div class="details-name">${char.nameCn}</div>
            <div class="details-name-en">${char.name}</div>
            <div class="details-role">${char.role}</div>
          </div>
        </div>

        <div class="details-relationships">
          <h4>关系网络</h4>
          <div class="relationships-list">
            ${related.map(rel => {
              const otherId = rel.from === characterId ? rel.to : rel.from;
              const other = characters[otherId];
              const type = relationshipTypes[rel.type];
              return `
                <div class="relationship-item">
                  <span class="rel-emoji">${other.emoji}</span>
                  <span class="rel-name">${other.nameCn}</span>
                  <span class="rel-type" style="color: ${type.color}">${type.icon} ${rel.label}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // 高亮选中的角色和关系
    document.querySelectorAll('.character-node').forEach(node => {
      node.style.opacity = node.dataset.character === characterId ? '1' : '0.3';
    });

    document.querySelectorAll('.relationship-line').forEach(line => {
      const isRelated = line.dataset.from === characterId || line.dataset.to === characterId;
      line.style.opacity = isRelated ? '1' : '0.1';
    });
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#relationship-map-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'relationship-map-styles';
    styles.textContent = `
      /* 关系图容器 */
      .relationship-map-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10006;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: mapFadeIn 0.3s ease;
      }

      @keyframes mapFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .map-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
      }

      .map-content {
        position: relative;
        width: 90%;
        max-width: 1200px;
        max-height: 90vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .map-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 25px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
      }

      .map-header h2 {
        margin: 0;
        font-size: 20px;
      }

      .map-close {
        background: none;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s;
      }

      .map-close:hover {
        opacity: 1;
      }

      .map-canvas-container {
        flex: 1;
        overflow: hidden;
        background: linear-gradient(135deg, #FDF2E9, #EAFAF1);
        padding: 20px;
      }

      .map-canvas {
        width: 100%;
        height: 100%;
        max-height: 500px;
      }

      .character-node {
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .character-node:hover {
        transform: scale(1.1);
      }

      .character-circle {
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        transition: all 0.3s ease;
      }

      .character-node:hover .character-circle {
        filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3));
      }

      .relationship-line {
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .relationship-line:hover {
        stroke-width: 6 !important;
        opacity: 1 !important;
      }

      .relationship-label {
        font-size: 11px;
        font-weight: 500;
        pointer-events: none;
      }

      /* 角色详情面板 */
      .character-details {
        padding: 20px 25px;
        background: rgba(155, 89, 182, 0.05);
        border-top: 1px solid rgba(155, 89, 182, 0.2);
        min-height: 200px;
      }

      .details-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 160px;
        color: #636E72;
      }

      .placeholder-icon {
        font-size: 48px;
        margin-bottom: 15px;
      }

      .details-content {
        animation: detailsSlideIn 0.3s ease;
      }

      @keyframes detailsSlideIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .details-header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 2px dashed rgba(155, 89, 182, 0.2);
      }

      .details-name {
        font-size: 24px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 5px;
      }

      .details-name-en {
        font-size: 14px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .details-role {
        display: inline-block;
        padding: 5px 12px;
        background: rgba(155, 89, 182, 0.2);
        color: #9B59B6;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 600;
      }

      .details-relationships h4 {
        margin: 0 0 15px 0;
        font-size: 16px;
        color: #2D3436;
      }

      .relationships-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
      }

      .relationship-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: white;
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      .relationship-item:hover {
        background: rgba(155, 89, 182, 0.1);
        transform: translateY(-2px);
      }

      .rel-emoji {
        font-size: 24px;
      }

      .rel-name {
        flex: 1;
        font-size: 14px;
        font-weight: 600;
        color: #2D3436;
      }

      .rel-type {
        font-size: 12px;
      }

      /* 图例 */
      .map-legend {
        padding: 15px 25px;
        background: rgba(255, 255, 255, 0.8);
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      .map-legend h3 {
        margin: 0 0 10px 0;
        font-size: 14px;
        color: #2D3436;
      }

      .legend-items {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .legend-line {
        width: 30px;
        border-radius: 2px;
      }

      .legend-label {
        font-size: 12px;
        color: #636E72;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .map-content {
          width: 95%;
        }

        .map-canvas {
          max-height: 350px;
        }

        .relationships-list {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化关系图
  function initRelationshipMap() {
    injectStyles();

    const map = createRelationshipMap();
    document.body.appendChild(map);

    // 关闭按钮
    map.querySelector('.map-close').onclick = () => {
      map.style.animation = 'mapFadeOut 0.3s ease forwards';
      setTimeout(() => map.remove(), 300);
    };

    // 角色节点点击
    map.querySelectorAll('.character-node').forEach(node => {
      node.onclick = (e) => {
        e.stopPropagation();
        const characterId = node.dataset.character;
        showCharacterDetails(characterId);
      };
    });

    // 添加关闭动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes mapFadeOut {
        to {
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 创建触发器按钮
  function createTriggerButton() {
    const btn = document.createElement('button');
    btn.className = 'relationship-trigger';
    btn.innerHTML = '🎭';
    btn.title = '角色关系图';

    btn.style.cssText = `
      position: fixed;
      bottom: 380px;
      left: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      background: linear-gradient(135deg, #9B59B6, #8E44AD);
      color: white;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
      z-index: 9995;
      transition: all 0.3s ease;
    `;

    btn.onmouseenter = () => {
      btn.style.transform = 'scale(1.1) rotate(-5deg)';
      btn.style.boxShadow = '0 6px 20px rgba(155, 89, 182, 0.5)';
    };

    btn.onmouseleave = () => {
      btn.style.transform = 'scale(1) rotate(0deg)';
      btn.style.boxShadow = '0 4px 15px rgba(155, 89, 182, 0.4)';
    };

    btn.onclick = initRelationshipMap;

    return btn;
  }

  // 页面加载完成后添加触发器
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(createTriggerButton());
    });
  } else {
    document.body.appendChild(createTriggerButton());
  }

  // 导出初始化函数
  window.showRelationshipMap = initRelationshipMap;
})();
