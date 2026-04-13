/**
 * 疯狂动物城主题 - Mr Big 家族系统
 * Zootopia Theme - Mr Big Family System
 * | 北极鼩黑帮家族完整介绍
 */

(function() {
  'use strict';

  // Mr Big 家族数据
  const mrBigFamily = {
    // 家族首领
    patriarch: {
      name: 'Mr Big',
      chineseName: '大先生',
      species: '北极鼩 (Arctic Shrew)',
      emoji: '🐹',
      title: '动物城最令人尊敬的黑帮老大',
      voiceActor: '莫里斯·拉马奇 (Maurice LaMarche)',
      inspiration: '原型来自《教父》马龙·白兰度配音的角色',
      personality: ['威严', '狡猾', '重视家庭', '慷慨', '危险'],
      quote: '"We are not predator and prey here. We are family."',
      quoteChinese: '"在这里，我们不是捕食者和猎物。我们是家人。"',
      description: '虽然体型娇小，但却是动物城最有影响力的黑帮老大。他的体型与地位形成戏剧性反差，是不可小觑的人物。',
      traits: [
        '北极鼩是地球上最凶猛的掠食者',
        '拥有庞大的犯罪帝国',
        '极度重视家人和荣誉',
        '对背叛者绝不留情',
        '欣赏勇敢和忠诚'
      ],
      business: [
        '建筑业',
        '运输业',
        '娱乐业',
        '餐饮业',
        '保险业'
      ]
    },

    // 家族成员
    members: [
      {
        name: 'Mrs. Big',
        chineseName: '大太太',
        species: '北极鼩',
        emoji: '🐹',
        role: 'Mr Big的妻子',
        personality: ['优雅', '支持丈夫', '保护家人'],
        description: 'Mr Big的贤内助，家族事务的重要决策者。'
      },
      {
        name: 'Fru Fru',
        chineseName: ' Fru Fru (水果)',
        species: '北极鼩',
        emoji: '🐹',
        role: 'Mr Big的爱女',
        personality: ['可爱', '善良', '喜欢婚礼', '时尚'],
        description: 'Mr Big最疼爱的女儿，在电影中与朱迪成为朋友，结婚时朱迪担任伴娘。',
        marriage: {
          spouse: '一只鼩鼠',
          event: '盛大的婚礼',
          judyRole: '伴娘',
          location: '冰川镇教堂'
        },
        funFacts: [
          '名字来自"水果" (Fru = Fruit)',
          '婚礼是电影的重要场景',
          '与朱迪的友谊打破物种隔阂'
        ]
      },
      {
        name: 'Manchas',
        chineseName: '曼查斯',
        species: '美洲豹',
        emoji: '🐆',
        role: '司机/保镖',
        personality: ['忠诚', '温和', '曾是夜班司机'],
        description: '曾为Mr Big开豪华轿车的司机，因"发狂"事件被辞退。实际上是被夜嚎花陷害。',
        background: '原本是温顺的美洲豹，在被陷害后变得恐惧和孤僻。',
        relation: ' trusted employee'
      },
      {
        name: '小黑帮成员',
        chineseName: '北极鼩保镖',
        species: '北极鼩',
        emoji: '🐹',
        role: '保镖/执行者',
        count: '众多',
        personality: ['忠诚', '凶猛', '不怕死'],
        description: 'Mr Big的私人军队，虽然体型小但极其危险。',
        tactics: '利用数量优势和出其不意的战术制服大型动物'
      },
      {
        name: 'Kevin',
        chineseName: '凯文',
        species: '北极鼩',
        emoji: '🐹',
        role: '高级助手',
        personality: ['聪明', '能干', '值得信赖'],
        description: 'Mr Big的得力助手，处理日常事务。'
      },
      {
        name: 'Raymond',
        chineseName: '雷蒙德',
        species: '北极鼩',
        emoji: '🐹',
        role: '高级助手',
        personality: ['沉稳', '可靠'],
        description: '与Kevin一起管理家族生意。'
      }
    ],

    // 家族产业
    empire: {
      name: 'Big Family Empire',
      chineseName: '大先生家族帝国',
      divisions: [
        {
          name: '建筑业',
          assets: ['建筑公司', '房地产', '装修团队'],
          description: '控制动物城多个重要建筑项目'
        },
        {
          name: '运输业',
          assets: ['卡车车队', '航运公司', '物流网络'],
          description: '管理动物城的货物和人员运输'
        },
        {
          name: '餐饮业',
          assets: ['高级餐厅', '甜品店', '咖啡厅'],
          description: '拥有多家知名餐饮场所'
        },
        {
          name: '娱乐业',
          assets: ['夜总会', '剧院', '娱乐中心'],
          description: '掌控部分娱乐场所'
        }
      ],
      totalValue: '数亿 z (🥕)'
    },

    // 家族规矩
    code: [
      '"Family comes first." (家人至上)',
      '"Respect the hierarchy." (尊重等级)',
      '"Never betray the family." (永不背叛)',
      '"Loyalty is rewarded." (忠诚有赏)',
      '"Disrespect has consequences." (冒犯必究)',
      '"Business is business." (公事公办)',
      '"Keep your mouth shut." (守口如瓶)',
      '"Protect the weak." (保护弱小)'
    ],

    // 经典场景
    scenes: [
      {
        name: '冰冻审判',
        description: 'Mr Big的冰冻处罚 - 将背叛者扔进冰水里',
        quote: '"Ice him." (把他冰了)',
        reference: '致敬《教父》马头场景'
      },
      {
        name: 'Fru Fru 婚礼',
        description: '女儿婚礼，朱迪担任伴娘',
        quote: '"You will be at the wedding, won\'t you?"',
        significance: '展示家族温情的一面'
      },
      {
        name: '与朱迪的初次见面',
        description: '朱迪停车不当，被带到Mr Big面前',
        outcome: '因朱迪救了女儿而获得好感',
        significance: '建立盟友关系'
      },
      {
        name: '尼克差点被冰冻',
        description: '尼克因过去的欺骗行为差点被处罚',
        resolution: 'Fru Fru求情，最终逃过一劫'
      }
    ],

    // 趣味事实
    funFacts: [
      '🐹 北极鼩是世界上体型最小的哺乳动物之一',
      '🎬 Mr Big的形象完全致敬《教父》',
      '🎭 配音演员莫里斯·拉马奇曾为马龙·白兰度配音',
      '❄️ 冰冻场景是对《教父》马头戏的恶搞',
      '👨‍👩‍👧 Fru Fru的婚礼有完整的筹备过程',
      '🏠 Mr Big的宅邸位于冰川镇',
      '🚗 他拥有一辆豪华的迷你轿车',
      '💎 尽管是黑帮，但Mr Big有很强的道德底线',
      '🦊 尼克曾因卖假冰棍给Mr Big的亲戚而被通缉',
      '🐰 朱迪成为少数被Mr Big信任的大型动物之一'
    ],

    // 与其他角色的关系
    relationships: [
      { character: '朱迪·霍普斯', relation: '盟友', detail: '因救了Fru Fru而获得信任' },
      { character: '尼克·王尔德', relation: '潜在威胁→朋友', detail: '曾因欺骗被通缉，后和解' },
      { character: 'Manchas', relation: '前员工', detail: '忠诚的司机，被陷害后辞退' },
      { character: '狮市长', relation: '表面尊重', detail: '互相利用的政商关系' }
    ]
  };

  // 创建Mr Big家族面板
  function createFamilyPanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-mr-big-family';
    panel.innerHTML = `
      <!-- 切换按钮 -->
      <div class="family-toggle" id="familyToggle">
        <span class="toggle-icon">🐹</span>
        <span class="toggle-text">Mr Big家族</span>
      </div>

      <!-- 主面板 -->
      <div class="family-panel" id="familyPanel" style="display: none;">
        <div class="panel-header">
          <div class="header-content">
            <span class="family-emoji">${mrBigFamily.patriarch.emoji}</span>
            <div class="header-text">
              <h2 class="family-title">${mrBigFamily.patriarch.chineseName}</h2>
              <p class="family-subtitle">${mrBigFamily.patriarch.name}</p>
            </div>
          </div>
          <button class="close-panel" id="closePanelBtn">×</button>
        </div>

        <!-- 家族首领卡片 -->
        <div class="patriarch-section">
          <div class="patriarch-card">
            <div class="patriarch-header">
              <span class="patriarch-emoji">${mrBigFamily.patriarch.emoji}</span>
              <div class="patriarch-info">
                <h3 class="patriarch-name">${mrBigFamily.patriarch.name}</h3>
                <p class="patriarch-title">${mrBigFamily.patriarch.title}</p>
              </div>
            </div>
            <p class="patriarch-species">${mrBigFamily.patriarch.species}</p>
            <p class="patriarch-description">${mrBigFamily.patriarch.description}</p>
            <div class="patriarch-quote">
              <p class="quote-text">"${mrBigFamily.patriarch.quoteChinese}"</p>
              <p class="quote-original">${mrBigFamily.patriarch.quote}</p>
            </div>
          </div>
        </div>

        <!-- 内容标签 -->
        <div class="content-tabs">
          <button class="tab-btn active" data-tab="members">家族成员</button>
          <button class="tab-btn" data-tab="empire">家族产业</button>
          <button class="tab-btn" data-tab="code">家族规矩</button>
          <button class="tab-btn" data-tab="scenes">经典场景</button>
        </div>

        <!-- 内容区域 -->
        <div class="content-area" id="contentArea">
          <!-- 家族成员 -->
          <div class="tab-content active" data-content="members" id="membersContent"></div>

          <!-- 家族产业 -->
          <div class="tab-content" data-content="empire" id="empireContent"></div>

          <!-- 家族规矩 -->
          <div class="tab-content" data-content="code" id="codeContent"></div>

          <!-- 经典场景 -->
          <div class="tab-content" data-content="scenes" id="scenesContent"></div>
        </div>
      </div>
    `;

    return panel;
  }

  // 渲染家族成员
  function renderMembers() {
    const container = document.getElementById('membersContent');
    if (!container) return;

    container.innerHTML = `
      <div class="members-grid">
        ${mrBigFamily.members.map(member => `
          <div class="member-card">
            <div class="member-header">
              <span class="member-emoji">${member.emoji}</span>
              <div class="member-info">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-chinese">${member.chineseName || ''}</p>
                <span class="member-role">${member.role}</span>
              </div>
            </div>
            <p class="member-species">${member.species}</p>
            ${member.personality ? `
            <div class="member-personality">
              ${member.personality.map(p => `<span class="personality-tag">${p}</span>`).join('')}
            </div>
            ` : ''}
            <p class="member-description">${member.description}</p>
            ${member.marriage ? `
            <div class="member-marriage">
              <h4 class="marriage-title">💒 婚姻</h4>
              <p class="marriage-detail">${member.marriage.event}</p>
              <p class="marriage-spouse">配偶: ${member.marriage.spouse}</p>
            </div>
            ` : ''}
            ${member.funFacts ? `
            <div class="member-facts">
              <h4>💡 趣味事实</h4>
              ${member.funFacts.map(f => `<p class="fact-item">• ${f}</p>`).join('')}
            </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // 渲染家族产业
  function renderEmpire() {
    const container = document.getElementById('empireContent');
    if (!container) return;

    container.innerHTML = `
      <div class="empire-section">
        <h3 class="empire-title">${mrBigFamily.empire.name}</h3>
        <p class="empire-subtitle">${mrBigFamily.empire.chineseName}</p>
        <p class="empire-value">总价值: ${mrBigFamily.empire.totalValue}</p>

        <div class="empire-divisions">
          ${mrBigFamily.empire.divisions.map(division => `
            <div class="division-card">
              <h4 class="division-name">${division.name}</h4>
              <p class="division-description">${division.description}</p>
              <div class="division-assets">
                ${division.assets.map(asset => `<span class="asset-tag">${asset}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 渲染家族规矩
  function renderCode() {
    const container = document.getElementById('codeContent');
    if (!container) return;

    container.innerHTML = `
      <div class="code-section">
        <h3 class="code-title">📜 家族规矩</h3>
        <div class="code-list">
          ${mrBigFamily.code.map((rule, index) => `
            <div class="code-item" data-index="${index + 1}">
              <span class="code-number">${index + 1}</span>
              <p class="code-text">${rule}</p>
            </div>
          `).join('')}
        </div>

        <div class="code-note">
          <p>⚠️ 违反家族规矩的后果：</p>
          <p>❄️ 冰冻处罚（Ice him）</p>
        </div>
      </div>
    `;
  }

  // 渲染经典场景
  function renderScenes() {
    const container = document.getElementById('scenesContent');
    if (!container) return;

    container.innerHTML = `
      <div class="scenes-section">
        ${mrBigFamily.scenes.map(scene => `
          <div class="scene-card">
            <h3 class="scene-name">🎬 ${scene.name}</h3>
            <p class="scene-description">${scene.description}</p>
            ${scene.quote ? `<p class="scene-quote">"${scene.quote}"</p>` : ''}
            ${scene.significance ? `<p class="scene-significance">📌 ${scene.significance}</p>` : ''}
            ${scene.reference ? `<p class="scene-reference">🎭 ${scene.reference}</p>` : ''}
          </div>
        `).join('')}
      </div>

      <div class="fun-facts-section">
        <h3 class="facts-title">💡 趣味事实</h3>
        <div class="facts-list">
          ${mrBigFamily.funFacts.map(fact => `
            <div class="fact-card">${fact}</div>
          `).join('')}
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
      case 'members': renderMembers(); break;
      case 'empire': renderEmpire(); break;
      case 'code': renderCode(); break;
      case 'scenes': renderScenes(); break;
    }
  }

  // 切换面板
  function togglePanel() {
    const panel = document.getElementById('familyPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#mr-big-family-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'mr-big-family-styles';
    styles.textContent = `
      /* 容器 */
      .zootopia-mr-big-family {
        position: fixed;
        bottom: 600px;
        right: 20px;
        z-index: 9992;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .family-toggle {
        background: linear-gradient(135deg, #2C3E50, #34495E);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(44, 62, 80, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .family-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(44, 62, 80, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: mobsterBounce 2s ease infinite;
      }

      @keyframes mobsterBounce {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-5deg); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 主面板 */
      .family-panel {
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
        background: linear-gradient(135deg, #2C3E50, #34495E);
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

      .family-emoji {
        font-size: 32px;
      }

      .family-title {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 3px 0;
      }

      .family-subtitle {
        font-size: 12px;
        margin: 0;
        opacity: 0.8;
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

      /* 家族首领区域 */
      .patriarch-section {
        padding: 15px;
        background: linear-gradient(135deg, rgba(44, 62, 80, 0.05), rgba(52, 73, 94, 0.05));
        border-bottom: 1px solid #ECF0F1;
      }

      .patriarch-card {
        background: white;
        border: 2px solid #2C3E50;
        border-radius: 15px;
        padding: 15px;
        text-align: center;
      }

      .patriarch-header {
        display: flex;
        align-items: center;
        gap: 12px;
        justify-content: center;
        margin-bottom: 10px;
      }

      .patriarch-emoji {
        font-size: 40px;
      }

      .patriarch-name {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 3px 0;
      }

      .patriarch-title {
        font-size: 12px;
        color: #636E72;
        margin: 0;
      }

      .patriarch-species {
        font-size: 11px;
        color: #95A5A6;
        margin: 8px 0;
      }

      .patriarch-description {
        font-size: 13px;
        color: #636E72;
        line-height: 1.5;
        margin: 10px 0;
      }

      .patriarch-quote {
        background: rgba(44, 62, 80, 0.05);
        border-left: 4px solid #2C3E50;
        padding: 12px;
        border-radius: 8px;
        margin-top: 15px;
      }

      .quote-text {
        font-size: 14px;
        color: #2D3436;
        font-style: italic;
        margin: 0 0 5px 0;
      }

      .quote-original {
        font-size: 11px;
        color: #95A5A6;
        margin: 0;
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
        background: linear-gradient(135deg, #2C3E50, #34495E);
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

      /* 家族成员网格 */
      .members-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .member-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 12px;
        padding: 12px;
        transition: all 0.3s ease;
      }

      .member-card:hover {
        border-color: #2C3E50;
        box-shadow: 0 4px 12px rgba(44, 62, 80, 0.15);
      }

      .member-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .member-emoji {
        font-size: 28px;
      }

      .member-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 2px 0;
      }

      .member-chinese {
        font-size: 11px;
        color: #636E72;
        margin: 0;
      }

      .member-role {
        padding: 3px 8px;
        background: #2C3E50;
        color: white;
        border-radius: 10px;
        font-size: 10px;
      }

      .member-species {
        font-size: 11px;
        color: #636E72;
        margin: 8px 0;
      }

      .member-personality {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin: 8px 0;
      }

      .personality-tag {
        padding: 3px 8px;
        background: rgba(44, 62, 80, 0.1);
        border-radius: 12px;
        font-size: 10px;
        color: #2C3E50;
      }

      .member-description {
        font-size: 12px;
        color: #636E72;
        margin: 8px 0;
        line-height: 1.5;
      }

      .member-marriage {
        background: rgba(255, 182, 193, 0.1);
        border-radius: 8px;
        padding: 10px;
        margin-top: 10px;
      }

      .marriage-title {
        font-size: 12px;
        font-weight: bold;
        color: #E91E63;
        margin: 0 0 5px 0;
      }

      .marriage-detail,
      .marriage-spouse {
        font-size: 11px;
        color: #636E72;
        margin: 3px 0;
      }

      .member-facts {
        margin-top: 10px;
      }

      .member-facts h4 {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 5px 0;
      }

      .fact-item {
        font-size: 10px;
        color: #636E72;
        margin: 3px 0;
      }

      /* 家族产业 */
      .empire-section {
        text-align: center;
      }

      .empire-title {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 5px 0;
      }

      .empire-subtitle {
        font-size: 14px;
        color: #636E72;
        margin: 0 0 10px 0;
      }

      .empire-value {
        font-size: 12px;
        color: #27AE60;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .empire-divisions {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .division-card {
        background: linear-gradient(135deg, rgba(44, 62, 80, 0.05), white);
        border: 2px solid #ECF0F1;
        border-radius: 12px;
        padding: 15px;
        text-align: left;
      }

      .division-name {
        font-size: 14px;
        font-weight: bold;
        color: #2C3E50;
        margin: 0 0 8px 0;
      }

      .division-description {
        font-size: 11px;
        color: #636E72;
        margin: 0 0 10px 0;
      }

      .division-assets {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }

      .asset-tag {
        padding: 4px 10px;
        background: #2C3E50;
        color: white;
        border-radius: 12px;
        font-size: 10px;
      }

      /* 家族规矩 */
      .code-section {
        text-align: center;
      }

      .code-title {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 15px 0;
      }

      .code-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
      }

      .code-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 10px;
        text-align: left;
      }

      .code-number {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #2C3E50;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
      }

      .code-text {
        font-size: 12px;
        color: #2D3436;
        margin: 0;
      }

      .code-note {
        background: rgba(231, 76, 60, 0.1);
        border: 2px solid #E74C3C;
        border-radius: 10px;
        padding: 12px;
      }

      .code-note p {
        font-size: 12px;
        color: #C0392B;
        margin: 5px 0;
      }

      /* 经典场景 */
      .scenes-section {
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
      }

      .scene-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 8px 0;
      }

      .scene-description {
        font-size: 12px;
        color: #636E72;
        margin: 0 0 8px 0;
      }

      .scene-quote {
        font-size: 11px;
        color: #2C3E50;
        font-style: italic;
        background: rgba(44, 62, 80, 0.05);
        padding: 8px;
        border-radius: 6px;
        margin: 8px 0;
      }

      .scene-significance,
      .scene-reference {
        font-size: 10px;
        color: #636E72;
        margin: 5px 0;
      }

      /* 趣味事实 */
      .fun-facts-section {
        background: rgba(243, 156, 18, 0.05);
        border-radius: 12px;
        padding: 15px;
      }

      .facts-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 12px 0;
      }

      .facts-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
      }

      .fact-card {
        padding: 10px;
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
        background: #2C3E50;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 450px) {
        .zootopia-mr-big-family {
          right: 10px;
          bottom: 580px;
        }

        .family-panel {
          width: calc(100vw - 20px);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initMrBigFamily() {
    injectStyles();

    const family = createFamilyPanel();
    document.body.appendChild(family);

    // 切换按钮
    document.getElementById('familyToggle').onclick = togglePanel;
    document.getElementById('closePanelBtn').onclick = () => {
      document.getElementById('familyPanel').style.display = 'none';
    };

    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // 初始渲染
    renderMembers();

    // 导出全局函数
    window.zootopiaMrBigFamily = {
      open: () => {
        document.getElementById('familyPanel').style.display = 'block';
      },
      showTab: (tabName) => switchTab(tabName)
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMrBigFamily);
  } else {
    initMrBigFamily();
  }
})();
