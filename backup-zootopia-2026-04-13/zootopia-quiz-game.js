/**
 * 疯狂动物城主题 - 知识问答游戏
 * Zootopia Theme - Quiz Game
 | 测试你对动物城的了解程度！
 */

(function() {
  'use strict';

  // 问答题库
  const questions = [
    {
      question: "Judy Hopps 的家乡在哪里？",
      options: ["撒哈拉广场", "兔窝镇", "冰川镇", "雨林区"],
      correct: 1,
      emoji: "🐰",
      points: 10
    },
    {
      question: "Nick Wilde 的标志性口头禅是什么？",
      options: ["Trust No One!", "It's called a hustle, sweetheart!", "Try Everything!", "无所畏惧"],
      correct: 1,
      emoji: "🦊",
      points: 10
    },
    {
      question: "Flash 的职业是什么？",
      options: ["ZPD警官", "DMV职员", "咖啡店老板", "出租车司机"],
      correct: 1,
      emoji: "🐢",
      points: 15
    },
    {
      question: "动物城的市长是谁？",
      options: ["Bellwether", "Lionheart", "Bogo", "Gazelle"],
      correct: 1,
      emoji: "🦁",
      points: 10
    },
    {
      question: "Pawpsicle 是什么？",
      options: ["一种胡萝卜", "冰棍", "甜甜圈", "蛋糕"],
      correct: 1,
      emoji: "🍭",
      points: 10
    },
    {
      question: "ZPD 是什么的缩写？",
      options: ["Zootopia Police Department", "Zootopia Post District", "Zootopia Public Defense", "Zootopia Pet Department"],
      correct: 0,
      emoji: "👮",
      points: 15
    },
    {
      question: "Gazelle 是什么明星？",
      options: ["电影明星", "歌手明星", "体育明星", "政治明星"],
      correct: 1,
      emoji: "🦌",
      points: 10
    },
    {
      question: "Mr Big 是什么动物？",
      options: ["北极熊", "北极鼩", "企鹅", "海豹"],
      correct: 1,
      emoji: "🐭",
      points: 20
    },
    {
      question: "Judy 有多少个兄弟姐妹？",
      options: ["275个", "100个", "50个", "没有兄弟姐妹"],
      correct: 0,
      emoji: "🐰",
      points: 25
    },
    {
      question: "动物城有多少个主要地区？",
      options: ["5个", "6个", "7个", "8个"],
      correct: 2,
      emoji: "🏙️",
      points: 15
    },
    {
      question: "Yax 是什么动物？",
      options: ["大象", "犀牛", "侏儒河马", "河马"],
      correct: 2,
      emoji: "🦛",
      points: 20
    },
    {
      question: "本杰明·克劳泽瑟最喜欢的歌手是谁？",
      options: ["Madonna", "Gazelle", "Taylor Swift", "Beyoncé"],
      correct: 1,
      emoji: "🦆",
      points: 15
    },
    {
      question: "电影上映年份是？",
      options: ["2015", "2016", "2017", "2018"],
      correct: 1,
      emoji: "🎬",
      points: 10
    },
    {
      question: "Bogo局长给Judy多少时间破案？",
      options: ["24小时", "36小时", "48小时", "72小时"],
      correct: 2,
      emoji: "🦁",
      points: 15
    },
    {
      question: "谁是幕后黑手？",
      options: ["Lionheart市长", "Bellwether副市长", "Bogo局长", "Nick Wilde"],
      correct: 1,
      emoji: "🐑",
      points: 25
    },
    {
      question: "Finnick 开什么车？",
      options: ["豪华轿车", "小型面包车", "跑车", "自行车"],
      correct: 1,
      emoji: "🦊",
      points: 20
    }
  ];

  // 游戏状态
  let quizState = {
    currentQuestion: 0,
    score: 0,
    answered: 0,
    isPlaying: false,
    answers: []
  };

  // 创建问答游戏容器
  function createQuizGame() {
    const container = document.createElement('div');
    container.className = 'zootopia-quiz-game';
    container.innerHTML = `
      <div class="quiz-overlay" onclick="this.closest('.zootopia-quiz-game').remove()"></div>
      <div class="quiz-content">
        <div class="quiz-header">
          <h2>🎓 动物城知识问答</h2>
          <button class="quiz-close">×</button>
        </div>

        <div class="quiz-body" id="quizBody">
          <div class="quiz-start-screen">
            <div class="start-icon">🎮</div>
            <div class="start-title">测试你的动物城知识！</div>
            <div class="start-desc">
              共15道题目，每题10-25分<br>
              看你能得多少分！
            </div>
            <div class="start-stats">
              <div class="start-stat">
                <span class="stat-emoji">📝</span>
                <span class="stat-value">15题</span>
              </div>
              <div class="start-stat">
                <span class="stat-emoji">⭐</span>
                <span class="stat-value">215分</span>
              </div>
              <div class="start-stat">
                <span class="stat-emoji">⏱️</span>
                <span class="stat-value">约5分钟</span>
              </div>
            </div>
            <button class="start-btn" onclick="startQuiz()">
              🚀 开始挑战
            </button>
          </div>
        </div>
      </div>
    `;

    return container;
  }

  // 开始问答
  function startQuiz() {
    quizState = {
      currentQuestion: 0,
      score: 0,
      answered: 0,
      isPlaying: true,
      answers: []
    };

    // 随机打乱题目
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 15);
    quizState.questions = shuffledQuestions;

    showQuestion();
  }

  // 显示题目
  function showQuestion() {
    const quizBody = document.getElementById('quizBody');
    const question = quizState.questions[quizState.currentQuestion];
    const progress = ((quizState.currentQuestion + 1) / quizState.questions.length * 100);

    quizBody.innerHTML = `
      <div class="question-container">
        <div class="question-progress">
          <div class="progress-bar-bg">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="progress-text">
            <span>${quizState.currentQuestion + 1}</span> / <span>${quizState.questions.length}</span>
          </div>
        </div>

        <div class="question-emoji">${question.emoji}</div>
        <div class="question-text">${question.question}</div>

        <div class="options-list">
          ${question.options.map((option, index) => `
            <button class="option-btn" onclick="answerQuestion(${index})">
              ${option}
            </button>
          `).join('')}
        </div>

        <div class="question-score">
          <span class="score-icon">🏆</span>
          <span class="score-value">${quizState.score}</span> 分
        </div>
      </div>
    `;
  }

  // 回答问题
  function answerQuestion(selectedIndex) {
    const question = quizState.questions[quizState.currentQuestion];
    const isCorrect = selectedIndex === question.correct;

    // 记录答案
    quizState.answers.push({
      question: question.question,
      selected: selectedIndex,
      correct: question.correct,
      isCorrect: isCorrect,
      points: isCorrect ? question.points : 0
    });

    // 更新分数
    if (isCorrect) {
      quizState.score += question.points;
      showFeedback(true, `正确！+${question.points}分`);
    } else {
      showFeedback(false, `错误！正确答案是：${question.options[question.correct]}`);
    }

    // 下一题或结束
    quizState.currentQuestion++;
    quizState.answered++;

    setTimeout(() => {
      if (quizState.currentQuestion < quizState.questions.length) {
        showQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }

  // 显示反馈
  function showFeedback(isCorrect, message) {
    const feedback = document.createElement('div');
    feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = `
      <span class="feedback-icon">${isCorrect ? '✅' : '❌'}</span>
      <span class="feedback-message">${message}</span>
    `;

    feedback.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 30px;
      background: ${isCorrect ? 'rgba(46, 213, 115, 0.95)' : 'rgba(255, 107, 107, 0.95)'};
      color: white;
      border-radius: 10px;
      z-index: 10011;
      display: flex;
      align-items: center;
      gap: 15px;
      font-size: 18px;
      font-weight: bold;
      animation: feedbackPop 0.3s ease;
    `;

    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.style.animation = 'feedbackFadeOut 0.5s ease forwards';
      setTimeout(() => feedback.remove(), 500);
    }, 1000);
  }

  // 显示结果
  function showResults() {
    const quizBody = document.getElementById('quizBody');
    const percentage = Math.round((quizState.score / 215) * 100);

    let rank = '新居民';
    let emoji = '🐣';
    if (percentage >= 90) {
      rank = '动物城专家';
      emoji = '👑';
    } else if (percentage >= 75) {
      rank = '动物城达人';
      emoji = '🌟';
    } else if (percentage >= 60) {
      rank = '动物城爱好者';
      emoji = '😊';
    } else {
      rank = '需要努力';
      emoji = '💪';
    }

    const correctCount = quizState.answers.filter(a => a.isCorrect).length;

    quizBody.innerHTML = `
      <div class="results-container">
        <div class="results-icon">${emoji}</div>
        <div class="results-title">挑战完成！</div>
        <div class="results-score">
          <div class="score-number">${quizState.score}</div>
          <div class="score-total">/ 215 分</div>
        </div>
        <div class="results-rank">
          <span class="rank-label">获得称号：</span>
          <span class="rank-name">${rank}</span>
        </div>
        <div class="results-stats">
          <div class="result-stat">
            <span class="result-label">正确题数</span>
            <span class="result-value">${correctCount} / 15</span>
          </div>
          <div class="result-stat">
            <span class="result-label">正确率</span>
            <span class="result-value">${percentage}%</span>
          </div>
        </div>
        <div class="results-actions">
          <button class="result-btn" onclick="startQuiz()">
            🔄 再玩一次
          </button>
          <button class="result-btn" onclick="this.closest('.zootopia-quiz-game').remove()">
            ✕ 关闭
          </button>
        </div>
      </div>
    `;
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#quiz-game-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'quiz-game-styles';
    styles.textContent = `
      /* 问答游戏 */
      .zootopia-quiz-game {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10010;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: quizFadeIn 0.3s ease;
      }

      @keyframes quizFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .quiz-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
      }

      .quiz-content {
        position: relative;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .quiz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 25px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
      }

      .quiz-header h2 {
        margin: 0;
        font-size: 20px;
      }

      .quiz-close {
        background: none;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        opacity: 0.8;
      }

      .quiz-close:hover {
        opacity: 1;
      }

      .quiz-body {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }

      .quiz-start-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 500px;
        text-align: center;
      }

      .start-icon {
        font-size: 64px;
        margin-bottom: 20px;
      }

      .start-title {
        font-size: 24px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 15px;
      }

      .start-desc {
        font-size: 16px;
        color: #636E72;
        margin-bottom: 30px;
        line-height: 1.6;
      }

      .start-stats {
        display: flex;
        gap: 30px;
        margin-bottom: 30px;
      }

      .start-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .stat-emoji {
        font-size: 32px;
      }

      .stat-value {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
      }

      .start-btn {
        padding: 15px 40px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        border: none;
        border-radius: 25px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
      }

      .start-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(155, 89, 182, 0.5);
      }

      /* 题目容器 */
      .question-container {
        animation: questionSlideIn 0.5s ease;
      }

      @keyframes questionSlideIn {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .question-progress {
        margin-bottom: 20px;
      }

      .progress-bar-bg {
        height: 8px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 8px;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #9B59B6, #8E44AD);
        border-radius: 4px;
        transition: width 0.3s ease;
      }

      .progress-text {
        text-align: center;
        font-size: 14px;
        color: #636E72;
        font-weight: 600;
      }

      .question-emoji {
        font-size: 48px;
        text-align: center;
        margin-bottom: 15px;
      }

      .question-text {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
        text-align: center;
        margin-bottom: 30px;
        line-height: 1.6;
      }

      .options-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
      }

      .option-btn {
        padding: 15px 20px;
        background: white;
        border: 2px solid rgba(155, 89, 182, 0.3);
        border-radius: 12px;
        font-size: 16px;
        color: #2D3436;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: left;
      }

      .option-btn:hover {
        background: rgba(155, 89, 182, 0.1);
        border-color: #9B59B6;
        transform: translateX(5px);
      }

      .question-score {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 15px;
        background: rgba(155, 89, 182, 0.1);
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        color: #9B59B6;
      }

      /* 结果页面 */
      .results-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 20px;
        text-align: center;
        animation: resultsPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes resultsPop {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .results-icon {
        font-size: 64px;
        margin-bottom: 20px;
      }

      .results-title {
        font-size: 28px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 20px;
      }

      .results-score {
        display: flex;
        align-items: baseline;
        gap: 10px;
        margin-bottom: 15px;
      }

      .score-number {
        font-size: 48px;
        font-weight: bold;
        color: #9B59B6;
      }

      .score-total {
        font-size: 24px;
        color: #636E72;
      }

      .results-rank {
        margin-bottom: 25px;
        padding: 15px 25px;
        background: rgba(155, 89, 182, 0.1);
        border-radius: 10px;
      }

      .rank-name {
        font-size: 20px;
        font-weight: bold;
        color: #9B59B6;
      }

      .results-stats {
        display: flex;
        gap: 30px;
        margin-bottom: 30px;
      }

      .result-stat {
        text-align: center;
      }

      .result-label {
        display: block;
        font-size: 12px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .result-value {
        font-size: 24px;
        font-weight: bold;
        color: #2D3436;
      }

      .results-actions {
        display: flex;
        gap: 15px;
      }

      .result-btn {
        padding: 15px 30px;
        border: none;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .result-btn:first-child {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
      }

      .result-btn:last-child {
        background: rgba(155, 89, 182, 0.1);
        color: #9B59B6;
        border: 2px solid #9B59B6;
      }

      .result-btn:hover {
        transform: translateY(-2px);
      }

      /* 反馈动画 */
      @keyframes feedbackPop {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframes feedbackFadeOut {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.2);
        }
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .quiz-content {
          width: 95%;
        }

        .start-stats,
        .results-stats {
          gap: 15px;
        }

        .results-score {
          flex-direction: column;
          align-items: center;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 创建触发器按钮
  function createTriggerButton() {
    const btn = document.createElement('button');
    btn.className = 'quiz-trigger';
    btn.innerHTML = '🎓';
    btn.title = '动物城问答';

    btn.style.cssText = `
      position: fixed;
      bottom: 590px;
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

    btn.onclick = () => {
      injectStyles();
      const game = createQuizGame();
      document.body.appendChild(game);

      // 关闭按钮
      game.querySelector('.quiz-close').onclick = () => {
        game.remove();
      };
    };

    return btn;
  }

  // 导出全局函数
  window.startQuiz = startQuiz;
  window.answerQuestion = answerQuestion;

  // 页面加载完成后添加触发器
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(createTriggerButton());
    });
  } else {
    document.body.appendChild(createTriggerButton());
  }
})();
