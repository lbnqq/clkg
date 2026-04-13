/**
 * 疯狂动物城主题 - Bellwether 反派分析系统
 * Zootopia Theme - Bellwether Villain Analysis
 * | 绵羊副市长隐藏反派全面解析
 */

(function() {
  'use strict';

  // Bellwether 反派数据
  const bellwetherData = {
    character: {
      name: 'Dawn Bellwether',
      chineseName: '道恩·贝尔威瑟',
      title: '绵羊副市长 / 真正反派',
      species: '绵羊 (Sheep)',
      emoji: '🐑',
      voiceActor: '珍妮·斯蕾特 (Jenny Slate)',
      chineseVoiceActor: '林兰',
      role: '动物城副市长 → 幕后黑手',
      personality: ['温和外表', '心思缜密', '善于伪装', '野心勃勃', '操纵大师'],
      appearance: {
        wool: '蓬松的羊毛',
        glasses: '红色眼镜',
        clothes: '职业套装',
        size: '中等体型'
      },
      quote: '"Fear always works!"',
      quoteChinese: '"恐惧总是有效！"',
      description: '表面上是温和无害的副市长，实际上是整个"夜嚎怪"袭击事件的幕后策划者。'
    },

    // 反派计划
    villainPlan: {
      name: '夜嚎怪计划',
      objective: '利用恐惧夺取权力，建立食草动物主导的动物城',
      method: '使用夜嚎花让食肉动物发狂',
      steps: [
        '收集夜嚎花',
        '暗中袭击食肉动物',
        '制造社会恐慌',
        '嫁祸狮市长',
        '夺取市长职位',
        '建立新秩序'
      ],
      timeline: '在电影大部分时间里隐藏身份，直到最后才揭露'
    },

    // 动机分析
    motivation: {
      primary: '长期被狮市长边缘化和轻视',
      secondary: [
        '想要推翻现有秩序',
        '认为食草动物应该统治',
        '个人野心和权力欲',
        '对狮市长的报复'
      ],
      psychology: '从小角色到大反派的典型转变 - 利用弱者身份获得同情，同时暗中策划阴谋'
    },

    // 隐藏策略
    hidingStrategies: [
      {
        strategy: '无害外表',
        description: '看起来温和友善，不会引起怀疑',
        effectiveness: '完美 - 朱迪和尼克完全没有怀疑她'
      },
      {
        strategy: '受害者姿态',
        description: '扮演被狮市长欺负的弱势角色',
        effectiveness: '赢得主角和观众的同情'
      },
      {
        strategy: '幕后操作',
        description: '从不亲自参与暴力行动',
        effectiveness: '保持双手清洁，避免直接证据'
      },
      {
        strategy: '信息控制',
        description: '作为副市长掌握关键信息',
        effectiveness: '能够提前预知和应对调查'
      }
    ],

    // 关键场景
    keyScenes: [
      {
        scene: '与朱迪初次见面',
        description: '表现得非常友好和支持',
        reality: '已经在评估朱迪的价值',
        significance: '展示隐藏能力'
      },
      {
        scene: '对狮市长的抱怨',
        description: '抱怨自己不受重视',
        reality: '在为政变造势',
        quote: '"他让我负责所有的...琐事"'
      },
      {
        scene: '揭露真相',
        description: '在博物馆最后揭露身份',
        quote: '"Fear always works! And I\'ll play you all like a piano!"',
        significance: '经典反派独白时刻'
      },
      {
        scene: '被捕',
        description: '被朱迪和尼克录音揭露',
        outcome: '在狱中仍然不服，计划失败'
      }
    ],

    // 失败原因
    failureReasons: [
      '低估了朱迪和尼克的智慧',
      '急于杀死他们而不是直接处理',
      '没有销毁录音证据',
      '过于自信，没有备用计划',
      '运气不好 - 被抓个正着'
    ],

    // 影响和意义
    impact: {
      theme: '揭示了歧视和偏见的危害',
      message: '最危险的反派往往隐藏在善良的外表下',
      innovation: '迪士尼动画中少有的政治阴谋反派',
      reception: '观众对剧情反转反应强烈',
      comparison: '与《教父》式的反转反派有相似之处'
    },

    // 趣味事实
    funFacts: [
      '🐑 是迪士尼动画中少数的绵羊角色',
      '👓 红色眼镜是她的标志',
      '🎭 在揭露前，观众完全没怀疑她',
      '📊 Reddit讨论认为她本可以成功',
      '🎬 她的揭露场景被认为是经典时刻',
      '💡 名字 Bellwether 意为"向导"',
      '🏛️ 作为副市长，确实做了很多实际工作',
      '⚡ 她的策划非常精密和系统化',
      '🎯 她的成功展示了隐性歧视的危险',
      '❄️ 结局可能被囚禁在冰川镇监狱'
    ],

    // 与其他角色的关系
    relationships: [
      { character: '狮市长', relation: '上司', dynamic: '表面服从，暗中谋划' },
      { character: '朱迪·霍普斯', relation: '利用工具', dynamic: '试图拉拢，后成敌人' },
      { character: '尼克·王尔德', relation: '目标', dynamic: '想让他成为夜嚎怪受害者' },
      { character: '道格 (Doug)', relation: '手下', dynamic: '负责执行夜嚎花袭击' },
      { character: 'Ram (公羊)', relation: '手下', dynamic: 'Bellwether的亲信' }
    ],

    // 夜嚎花武器
    nightHowlers: {
      name: '夜嚎花 (Night Howlers)',
      description: '能够使哺乳动物发狂的花朵',
      effects: [
        '让温顺动物变得具有攻击性',
        '引发不可控的暴力行为',
        '效果可逆，但需要及时治疗'
      ],
      usage: '用于陷害食肉动物，制造恐慌',
      distribution: '通过道格和手下暗中投放'
    },

    // 对Zootopia 2的启示
    implications: [
      '续作可能有新的反派出现',
      '动物城的政治阴谋可能继续',
      '社会问题仍是核心主题',
      'Bellwether的followers可能仍在活动'
    ]
  };

  // 创建反派分析面板
  function createVillainPanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-bellwether-villain';
    panel.innerHTML = `
      <!-- 切换按钮 -->
      <div class="villain-toggle" id="villainToggle">
        <span class="toggle-icon">🐑</span>
        <span class="toggle-text">Bellwether反派</span>
      </div>

      <!-- 主面板 -->
      <div class="villain-panel" id="villainPanel" style="display: none;">
        <div class="panel-header">
          <div class="header-content">
            <span class="villain-emoji">${bellwetherData.character.emoji}</span>
            <div class="header-text">
              <h2 class="villain-name">${bellwetherData.character.chineseName}</h2>
              <p class="villain-title">${bellwetherData.character.title}</p>
            </div>
          </div>
          <button class="close-panel" id="closePanelBtn">×</button>
        </div>

        <!-- 角色卡片 -->
        <div class="character-section">
          <div class="character-card">
            <div class="character-emoji">${bellwetherData.character.emoji}</div>
            <h3 class="character-name">${bellwetherData.character.name}</h3>
            <p class="character-species">${bellwetherData.character.species}</p>
            <p class="character-quote">"${bellwetherData.character.quoteChinese}"</p>
            <div class="character-personality">
              ${bellwetherData.character.personality.map(p => `<span class="personality-tag">${p}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- 内容标签 -->
        <div class="content-tabs">
          <button class="tab-btn active" data-tab="plan">反派计划</button>
          <button class="tab-btn" data-tab="strategies">隐藏策略</button>
          <button class="tab-btn" data-tab="scenes">关键场景</button>
          <button class="tab-btn" data-tab="impact">影响分析</button>
        </div>

        <!-- 内容区域 -->
        <div class="content-area" id="contentArea">
          <!-- 反派计划 -->
          <div class="tab-content active" data-content="plan" id="planContent"></div>

          <!-- 隐藏策略 -->
          <div class="tab-content" data-content="strategies" id="strategiesContent"></div>

          <!-- 关键场景 -->
          <div class="tab-content" data-content="scenes" id="scenesContent"></div>

          <!-- 影响分析 -->
          <div class="tab-content" data-content="impact" id="impactContent"></div>
        </div>
      </div>
    `;

    return panel;
  }

  // 渲染反派计划
  function renderPlan() {
    const container = document.getElementById('planContent');
    if (!container) return;

    const plan = bellwetherData.villainPlan;

    container.innerHTML = `
      <div class="plan-section">
        <h3 class="section-title">🎯 ${plan.name}</h3>
        <p class="plan-objective">目标: ${plan.objective}</p>
        <p class="plan-method">手段: ${plan.method}</p>

        <div class="plan-steps">
          <h4 class="steps-title">执行步骤</h4>
          ${plan.steps.map((step, index) => `
            <div class="step-item">
              <span class="step-number">${index + 1}</span>
              <p class="step-text">${step}</p>
            </div>
          `).join('')}
        </div>

        <div class="plan-timeline">
          <p class="timeline-text">⏰ ${plan.timeline}</p>
        </div>

        <div class="motivation-section">
          <h4 class="motivation-title">🎭 动机分析</h4>
          <p class="motivation-primary">主要动机: ${bellwetherData.motivation.primary}</p>
          <div class="motivation-secondary">
            ${bellwetherData.motivation.secondary.map(m => `<span class="motivation-tag">${m}</span>`).join('')}
          </div>
          <p class="motivation-psychology">${bellwetherData.motivation.psychology}</p>
        </div>

        <div class="night-howlers-section">
          <h4 class="howlers-title">🌸 夜嚎花武器</h4>
          <p class="howlers-description">${bellwetherData.nightHowlers.description}</p>
          <div class="howlers-effects">
            ${bellwetherData.nightHowlers.effects.map(effect => `
              <div class="effect-item">• ${effect}</div>
            `).join('')}
          </div>
          <p class="howlers-usage">用途: ${bellwetherData.nightHowlers.usage}</p>
        </div>
      </div>
    `;
  }

  // 渲染隐藏策略
  function renderStrategies() {
    const container = document.getElementById('strategiesContent');
    if (!container) return;

    container.innerHTML = `
      <div class="strategies-section">
        <h3 class="section-title">🎭 隐藏策略</h3>
        <div class="strategies-list">
          ${bellwetherData.hidingStrategies.map((strategy, index) => `
            <div class="strategy-card">
              <div class="strategy-header">
                <span class="strategy-number">${index + 1}</span>
                <h4 class="strategy-name">${strategy.strategy}</h4>
              </div>
              <p class="strategy-description">${strategy.description}</p>
              <div class="strategy-effectiveness">
                <span class="effectiveness-label">效果:</span>
                <span class="effectiveness-value">${strategy.effectiveness}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="failure-section">
          <h3 class="failure-title">💥 失败原因</h3>
          <div class="failure-list">
            ${bellwetherData.failureReasons.map(reason => `
              <div class="failure-item">• ${reason}</div>
            `).join('')}
          </div>
          <p class="failure-note">⚠️ Reddit讨论：如果不是运气不好，Bellwether 本可以成功改变动物城的命运。</p>
        </div>
      </div>
    `;
  }

  // 渲染关键场景
  function renderScenes() {
    const container = document.getElementById('scenesContent');
    if (!container) return;

    container.innerHTML = `
      <div class="scenes-section">
        <h3 class="section-title">🎬 关键场景</h3>
        <div class="scenes-list">
          ${bellwetherData.keyScenes.map((scene, index) => `
            <div class="scene-card">
              <div class="scene-header">
                <span class="scene-number">${index + 1}</span>
                <h4 class="scene-name">${scene.scene}</h4>
              </div>
              <p class="scene-description">${scene.description}</p>
              <p class="scene-reality">真实意图: ${scene.reality}</p>
              ${scene.quote ? `<p class="scene-quote">"${scene.quote}"</p>` : ''}
              ${scene.significance ? `<p class="scene-significance">📌 ${scene.significance}</p>` : ''}
              ${scene.outcome ? `<p class="scene-outcome">结局: ${scene.outcome}</p>` : ''}
            </div>
          `).join('')}
        </div>

        <div class="fun-facts-section">
          <h3 class="facts-title">💡 趣味事实</h3>
          <div class="facts-grid">
            ${bellwetherData.funFacts.map(fact => `
              <div class="fact-item">${fact}</div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 渲染影响分析
  function renderImpact() {
    const container = document.getElementById('impactContent');
    if (!container) return;

    const impact = bellwetherData.impact;

    container.innerHTML = `
      <div class="impact-section">
        <h3 class="section-title">📊 影响和意义</h3>
        <div class="impact-grid">
          <div class="impact-item">
            <span class="impact-label">主题</span>
            <p class="impact-value">${impact.theme}</p>
          </div>
          <div class="impact-item">
            <span class="impact-label">信息</span>
            <p class="impact-value">${impact.message}</p>
          </div>
          <div class="impact-item">
            <span class="impact-label">创新</span>
            <p class="impact-value">${impact.innovation}</p>
          </div>
          <div class="impact-item">
            <span class="impact-label">反响</span>
            <p class="impact-value">${impact.reception}</p>
          </div>
        </div>

        <div class="relationships-section">
          <h4 class="relationships-title">🤝 人物关系</h4>
          <div class="relationships-list">
            ${bellwetherData.relationships.map(rel => `
              <div class="relationship-card">
                <span class="relation-character">${rel.character}</span>
                <span class="relation-type">${rel.relation}</span>
                <p class="relation-dynamic">${rel.dynamic}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="implications-section">
          <h3 class="implications-title">🔮 对Zootopia 2的启示</h3>
          <div class="implications-list">
            ${bellwetherData.implications.map(imp => `
              <div class="implication-item">• ${imp}</div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 切换标签
  function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.dataset.content === tabName);
    });

    // 渲染对应内容
    switch(tabName) {
      case 'plan': renderPlan(); break;
      case 'strategies': renderStrategies(); break;
      case 'scenes': renderScenes(); break;
      case 'impact': renderImpact(); break;
    }
  }

  // 切换面板
  function togglePanel() {
    const panel = document.getElementById('villainPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#bellwether-villain-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'bellwether-villain-styles';
    styles.textContent = `
      /* 容器 */
      .zootopia-bellwether-villain {
        position: fixed;
        bottom: 480px;
        right: 20px;
        z-index: 9990;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .villain-toggle {
        background: linear-gradient(135deg, #95A5A6, #7F8C8D);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(149, 165, 166, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .villain-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(149, 165, 166, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: sheepBounce 2s ease infinite;
      }

      @keyframes sheepBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 主面板 */
      .villain-panel {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 400px;
        max-height: 85vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .panel-header {
        background: linear-gradient(135deg, #95A5A6, #7F8C8D);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .villain-emoji {
        font-size: 32px;
      }

      .villain-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 3px 0;
      }

      .villain-title {
        font-size: 11px;
        margin: 0;
        opacity: 0.9;
      }

      .close-panel {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      /* 角色区域 */
      .character-section {
        padding: 15px;
        background: linear-gradient(135deg, rgba(149, 165, 166, 0.05), rgba(127, 140, 141, 0.05));
        text-align: center;
      }

      .character-card {
        background: white;
        border: 2px solid #95A5A6;
        border-radius: 15px;
        padding: 15px;
      }

      .character-emoji {
        font-size: 48px;
        display: block;
        margin-bottom: 10px;
      }

      .character-name {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 5px 0;
      }

      .character-species {
        font-size: 12px;
        color: #636E72;
        margin: 0 0 10px 0;
      }

      .character-quote {
        font-size: 14px;
        font-style: italic;
        color: #2C3E50;
        margin: 10px 0;
      }

      .character-personality {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        justify-content: center;
      }

      .personality-tag {
        padding: 4px 10px;
        background: rgba(149, 165, 166, 0.1);
        border-radius: 15px;
        font-size: 10px;
        color: #95A5A6;
      }

      /* 标签 */
      .content-tabs {
        display: flex;
        padding: 10px;
        gap: 5px;
        border-bottom: 1px solid #ECF0F1;
      }

      .tab-btn {
        flex: 1;
        padding: 8px 10px;
        border: none;
        background: #F8F9FA;
        border-radius: 20px;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: bold;
      }

      .tab-btn:hover {
        background: #ECF0F1;
      }

      .tab-btn.active {
        background: linear-gradient(135deg, #95A5A6, #7F8C8D);
        color: white;
      }

      /* 内容区域 */
      .content-area {
        padding: 15px;
        overflow-y: auto;
        max-height: 450px;
      }

      .tab-content {
        display: none;
      }

      .tab-content.active {
        display: block;
      }

      /* 计划部分 */
      .plan-section {
        text-align: center;
      }

      .section-title {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 15px 0;
      }

      .plan-objective,
      .plan-method {
        font-size: 12px;
        color: #636E72;
        margin: 5px 0;
      }

      .plan-steps {
        margin: 20px 0;
      }

      .steps-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 12px 0;
      }

      .step-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 8px;
        margin-bottom: 8px;
      }

      .step-number {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #C0392B;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
      }

      .step-text {
        flex: 1;
        font-size: 12px;
        color: #2D3436;
        margin: 0;
      }

      .plan-timeline {
        margin: 15px 0;
      }

      .timeline-text {
        font-size: 11px;
        color: #95A5A6;
        font-style: italic;
      }

      .motivation-section,
      .night-howlers-section {
        background: rgba(192, 57, 43, 0.05);
        border-radius: 12px;
        padding: 15px;
        margin: 20px 0;
        text-align: left;
      }

      .motivation-title,
      .howlers-title {
        font-size: 14px;
        font-weight: bold;
        color: #C0392B;
        margin: 0 0 10px 0;
      }

      .motivation-primary {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 10px 0;
      }

      .motivation-secondary {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 10px;
      }

      .motivation-tag {
        padding: 4px 10px;
        background: #C0392B;
        color: white;
        border-radius: 12px;
        font-size: 10px;
      }

      .motivation-psychology {
        font-size: 11px;
        color: #636E72;
        font-style: italic;
        margin: 0;
      }

      .howlers-description {
        font-size: 12px;
        color: #2D3436;
        margin: 0 0 10px 0;
      }

      .howlers-effects {
        margin: 10px 0;
      }

      .effect-item {
        font-size: 11px;
        color: #636E72;
        padding: 5px 0;
      }

      .howlers-usage {
        font-size: 11px;
        color: #C0392B;
        margin: 5px 0 0 0;
      }

      /* 策略部分 */
      .strategies-section {
        text-align: center;
      }

      .strategies-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
      }

      .strategy-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 12px;
        padding: 12px;
        text-align: left;
      }

      .strategy-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .strategy-number {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #95A5A6;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: bold;
      }

      .strategy-name {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
        margin: 0;
      }

      .strategy-description {
        font-size: 11px;
        color: #636E72;
        margin: 0 0 8px 0;
      }

      .strategy-effectiveness {
        display: flex;
        gap: 5px;
        font-size: 10px;
      }

      .effectiveness-label {
        color: #636E72;
      }

      .effectiveness-value {
        font-weight: bold;
        color: #27AE60;
      }

      .failure-section {
        background: rgba(231, 76, 60, 0.05);
        border: 2px solid #E74C3C;
        border-radius: 12px;
        padding: 15px;
      }

      .failure-title {
        font-size: 14px;
        font-weight: bold;
        color: #C0392B;
        margin: 0 0 10px 0;
      }

      .failure-list {
        margin-bottom: 10px;
      }

      .failure-item {
        font-size: 11px;
        color: #2D3436;
        padding: 5px 0;
      }

      .failure-note {
        font-size: 10px;
        color: #C0392B;
        font-style: italic;
        margin: 0;
      }

      /* 场景部分 */
      .scenes-section {
        text-align: center;
      }

      .scenes-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
      }

      .scene-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 12px;
        padding: 12px;
        text-align: left;
      }

      .scene-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .scene-number {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #95A5A6;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: bold;
      }

      .scene-name {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
        margin: 0;
      }

      .scene-description {
        font-size: 11px;
        color: #636E72;
        margin: 0 0 5px 0;
      }

      .scene-reality {
        font-size: 10px;
        color: #C0392B;
        margin: 5px 0;
      }

      .scene-quote {
        font-size: 11px;
        font-style: italic;
        color: #2C3E50;
        background: rgba(44, 62, 80, 0.05);
        padding: 8px;
        border-radius: 6px;
        margin: 8px 0;
      }

      .scene-significance,
      .scene-outcome {
        font-size: 10px;
        color: #636E72;
        margin: 5px 0;
      }

      /* 影响部分 */
      .impact-section {
        text-align: center;
      }

      .impact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 20px;
      }

      .impact-item {
        background: #F8F9FA;
        padding: 10px;
        border-radius: 8px;
      }

      .impact-label {
        display: block;
        font-size: 10px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .impact-value {
        font-size: 11px;
        font-weight: bold;
        color: #2D3436;
        margin: 0;
      }

      .relationships-section {
        margin-bottom: 20px;
      }

      .relationships-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 12px 0;
      }

      .relationships-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .relationship-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 8px;
        padding: 10px;
      }

      .relation-character {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
        display: block;
        margin-bottom: 3px;
      }

      .relation-type {
        padding: 2px 8px;
        background: #95A5A6;
        color: white;
        border-radius: 10px;
        font-size: 9px;
      }

      .relation-dynamic {
        font-size: 10px;
        color: #636E72;
        margin: 5px 0 0 0;
      }

      .implications-section {
        background: rgba(52, 152, 219, 0.05);
        border-radius: 12px;
        padding: 15px;
      }

      .implications-title {
        font-size: 14px;
        font-weight: bold;
        color: #3498DB;
        margin: 0 0 10px 0;
      }

      .implications-list {
        text-align: left;
      }

      .implication-item {
        font-size: 11px;
        color: #2D3436;
        padding: 5px 0;
      }

      /* 趣味事实 */
      .fun-facts-section {
        background: rgba(243, 156, 18, 0.05);
        border-radius: 12px;
        padding: 15px;
        margin-top: 20px;
      }

      .facts-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 12px 0;
      }

      .facts-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
        text-align: left;
      }

      .fact-item {
        padding: 8px;
        background: white;
        border-radius: 8px;
        font-size: 11px;
        color: #636E72;
      }

      /* 滚动条 */
      .content-area::-webkit-scrollbar {
        width: 4px;
      }

      .content-area::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .content-area::-webkit-scrollbar-thumb {
        background: #95A5A6;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 450px) {
        .zootopia-bellwether-villain {
          right: 10px;
          bottom: 460px;
        }

        .villain-panel {
          width: calc(100vw - 20px);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initBellwetherVillain() {
    injectStyles();

    const villain = createVillainPanel();
    document.body.appendChild(villain);

    // 切换按钮
    document.getElementById('villainToggle').onclick = togglePanel;
    document.getElementById('closePanelBtn').onclick = () => {
      document.getElementById('villainPanel').style.display = 'none';
    };

    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // 初始渲染
    renderPlan();

    // 导出全局函数
    window.zootopiaBellwether = {
      open: () => {
        document.getElementById('villainPanel').style.display = 'block';
      },
      showTab: (tabName) => switchTab(tabName)
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBellwetherVillain);
  } else {
    initBellwetherVillain();
  }
})();
