/**
 * 疯狂动物城 - ZPD罚单生成系统
 * Version: 1.0.0
 *
 * 轻量级罚单生成功能，增加趣味互动
 *
 * 功能:
 * - 自动生成ZPD风格罚单
 * - 多种违规类型
 * - 角色签名
 * - 打印/分享功能
 * - 轻量级实现
 */

(function($) {
    'use strict';

    // ========================================
    // ZPD罚单配置
    // ========================================

    const VIOLATION_TYPES = {
        traffic: {
            name: '交通违规',
            fines: [
                { code: 'ZT-001', name: '超速行驶', fine: 150 },
                { code: 'ZT-002', name: '非法停车', fine: 75 },
                { code: 'ZT-003', name: '闯红灯', fine: 200 },
                { code: 'ZT-004', name: '逆向行驶', fine: 250 },
                { code: 'ZT-005', name: '未礼让行人', fine: 100 }
            ]
        },
        public_disturbance: {
            name: '扰乱公共秩序',
            fines: [
                { code: 'ZT-101', name: '深夜吵闹', fine: 50 },
                { code: 'ZT-102', name: '在禁食区吃冰淇淋', fine: 30 },
                { code: 'ZT-103', name: '未清理动物粪便', fine: 40 },
                { code: 'ZT-104', name: '非法售卖爪爪冰棍', fine: 100 },
                { code: 'ZT-105', name: '扰乱公共演出', fine: 80 }
            ]
        },
        tax_evasion: {
            name: '税务违规',
            fines: [
                { code: 'ZT-201', name: '未申报冰淇淋收入', fine: 500 },
                { code: 'ZT-202', name: '偷税漏税', fine: 1000 },
                { code: 'ZT-203', name: '虚假财务申报', fine: 300 }
            ]
        },
        fun: {
            name: '趣味违规',
            fines: [
                { code: 'ZT-401', name: '过度卖萌', fine: 10 },
                { code: 'ZT-402', name: '忘记吃甜甜圈', fine: 5 },
                { code: 'ZT-403', name: '上班迟到', fine: 15 },
                { code: 'ZT-404', name: '太好客了', fine: 20 },
                { code: 'ZT-405', name: '太可爱违规', fine: 0 }
            ]
        }
    };

    const OFFICERS = [
        { name: '朱迪·霍普斯', badge: 'ZPD-001', role: '警官' },
        { name: '尼克·王尔德', badge: 'ZPD-002', role: '辅警' },
        { name: '旁克·局长', badge: 'ZPD-003', role: '局长' }
    ];

    // ========================================
    // 罚单模板
    // ========================================

    function generateTicketNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        return `ZT-${year}${month}${day}-${random}`;
    }

    function generateTicket(options) {
        const violationType = options.type || 'fun';
        const typeConfig = VIOLATION_TYPES[violationType];
        const violation = typeConfig.fines[Math.floor(Math.random() * typeConfig.fines.length)];
        const officer = OFFICERS[Math.floor(Math.random() * OFFICERS.length)];

        return {
            ticketNumber: generateTicketNumber(),
            date: new Date().toLocaleDateString('zh-CN'),
            time: new Date().toLocaleTimeString('zh-CN'),
            location: options.location || getRandomLocation(),
            violator: options.violator || '匿名市民',
            violation: violation,
            officer: officer,
            notes: options.notes || generateRandomNotes(),
            status: '未处理'
        };
    }

    function getRandomLocation() {
        const locations = [
            '撒哈拉广场', '镇康镇', '雨林区', '冰川镇',
            '沙漠区', '草地中心', '市政厅', 'ZPD总部',
            '爪爪冰棍摊', '甜甜圈店', '地铁站', '缆车站'
        ];
        return locations[Math.floor(Math.random() * locations.length)];
    }

    function generateRandomNotes() {
        const notes = [
            '请在30天内到ZPD总部缴纳罚款',
            '如有异议，可在7日内向动物城法院申诉',
            '记得下次注意！',
            'Try Everything! 不要再犯了！',
            '朱迪警官说：任何人都可以改变！',
            '尼克警官说：这叫 hustle！',
            '保持动物城的和谐！',
            '罚单收入将用于社区建设'
        ];
        return notes[Math.floor(Math.random() * notes.length)];
    }

    // ========================================
    // UI功能
    // ========================================

    function showTicketGenerator() {
        const modal = document.createElement('div');
        modal.className = 'zt-ticket-modal';
        modal.innerHTML = `
            <div class="zt-ticket-content">
                <div class="zt-ticket-header">
                    <h2>📝 ZPD罚单生成器</h2>
                    <button class="zt-ticket-close" onclick="this.closest('.zt-ticket-modal').remove()">×</button>
                </div>
                <div class="zt-ticket-body">
                    <div class="zt-ticket-form">
                        <div class="zt-form-group">
                            <label>违规人姓名</label>
                            <input type="text" id="zt-violator-name" placeholder="输入姓名或留空" />
                        </div>
                        <div class="zt-form-group">
                            <label>违规地点</label>
                            <select id="zt-location">
                                <option value="">随机</option>
                                <option value="撒哈拉广场">撒哈拉广场</option>
                                <option value="镇康镇">镇康镇</option>
                                <option value="雨林区">雨林区</option>
                                <option value="冰川镇">冰川镇</option>
                            </select>
                        </div>
                        <div class="zt-form-group">
                            <label>违规类型</label>
                            <select id="zt-violation-type">
                                <option value="traffic">交通违规</option>
                                <option value="public_disturbance">扰乱公共秩序</option>
                                <option value="tax_evasion">税务违规</option>
                                <option value="fun" selected>趣味违规</option>
                            </select>
                        </div>
                        <div class="zt-form-group">
                            <label>备注说明</label>
                            <textarea id="zt-notes" rows="2" placeholder="选填"></textarea>
                        </div>
                        <button class="zt-ticket-generate" onclick="window.ZPDTicket.generate()">
                            生成罚单 📝
                        </button>
                    </div>
                    <div class="zt-ticket-preview" id="zt-ticket-preview">
                        <div class="zt-ticket-empty">
                            <p>👮 点击"生成罚单"查看预览</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    }

    function displayTicket(ticket) {
        const preview = document.getElementById('zt-ticket-preview');
        if (!preview) return;

        preview.innerHTML = `
            <div class="zt-ticket-paper">
                <div class="zt-ticket-header">
                    <div class="zt-ticket-badge">
                        <span class="zt-badge-icon">👮</span>
                        <span class="zt-badge-text">ZPD ANIMALIA CITY</span>
                    </div>
                    <div class="zt-ticket-number">${ticket.ticketNumber}</div>
                </div>
                <div class="zt-ticket-body">
                    <div class="zt-ticket-row">
                        <span class="zt-ticket-label">日期时间:</span>
                        <span class="zt-ticket-value">${ticket.date} ${ticket.time}</span>
                    </div>
                    <div class="zt-ticket-row">
                        <span class="zt-ticket-label">违规地点:</span>
                        <span class="zt-ticket-value">${ticket.location}</span>
                    </div>
                    <div class="zt-ticket-row">
                        <span class="zt-ticket-label">违规人:</span>
                        <span class="zt-ticket-value">${ticket.violator}</span>
                    </div>
                    <div class="zt-ticket-row">
                        <span class="zt-ticket-label">违章代码:</span>
                        <span class="zt-ticket-value">${ticket.violation.code} - ${ticket.violation.name}</span>
                    </div>
                    <div class="zt-ticket-row highlight">
                        <span class="zt-ticket-label">罚款金额:</span>
                        <span class="zt-ticket-value zt-fine-amount">💰 ${ticket.violation.fine} 动物币</span>
                    </div>
                    <div class="zt-ticket-row">
                        <span class="zt-ticket-label">备注:</span>
                        <span class="zt-ticket-value">${ticket.notes}</span>
                    </div>
                    <div class="zt-ticket-officer">
                        <span class="zt-ticket-label">开单警官:</span>
                        <span class="zt-ticket-value">${ticket.officer.name} (${ticket.officer.badge})</span>
                    </div>
                </div>
                <div class="zt-ticket-footer">
                    <div class="zt-ticket-actions">
                        <button class="zt-ticket-action" onclick="window.ZPDTicket.print()">
                            🖨️ 打印
                        </button>
                        <button class="zt-ticket-action" onclick="window.ZPDTicket.share()">
                            📤 分享
                        </button>
                        <button class="zt-ticket-action" onclick="window.ZPDTicket.save()">
                            💾 保存
                        </button>
                    </div>
                    <div class="zt-ticket-stamp">
                        <div class="zt-stamp-inner">ZPD</div>
                    </div>
                </div>
            </div>
        `;
    }

    // ========================================
    // 功能函数
    // ========================================

    function generateTicketFromForm() {
        const violator = document.getElementById('zt-violator-name').value || '匿名市民';
        const location = document.getElementById('zt-location').value || '';
        const type = document.getElementById('zt-violation-type').value;
        const notes = document.getElementById('zt-notes').value || '';

        const ticket = generateTicket({
            violator: violator,
            location: location || undefined,
            type: type,
            notes: notes || undefined
        });

        displayTicket(ticket);

        // 奖励积分
        if (window.ztAddPoints) {
            window.ztAddPoints(2, 'zpd_ticket');
        }

        // 显示通知
        if (window.ztNotify) {
            window.ztNotify(`📝 ZPD罚单已生成！罚款 ${ticket.violation.fine} 动物币`, 'info');
        }
    }

    function printTicket() {
        const ticket = document.querySelector('.zt-ticket-paper');
        if (!ticket) return;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>ZPD罚单</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .zt-ticket-paper { border: 2px solid #333; padding: 20px; max-width: 400px; }
                    .zt-ticket-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 5px 0; border-bottom: 1px dashed #ccc; }
                    .zt-fine-amount { color: #E17055; font-weight: bold; font-size: 18px; }
                    .zt-ticket-stamp { text-align: center; margin-top: 20px; }
                    .zt-stamp-inner { border: 3px solid #E17055; color: #E17055; padding: 10px; display: inline-block; transform: rotate(-15deg); }
                </style>
            </head>
            <body>
                ${ticket.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    function shareTicket() {
        const ticket = document.querySelector('.zt-ticket-paper');
        if (!ticket) return;

        // 简化分享：复制罚单内容到剪贴板
        const ticketText = `👮 ZPD罚单\n\n` +
            `罚单号: ${ticket.querySelector('.zt-ticket-number')?.textContent}\n` +
            `违规: ${ticket.querySelector('.zt-ticket-value:nth-child(2)')?.textContent}\n` +
            `罚款: ${ticket.querySelector('.zt-fine-amount')?.textContent}\n\n` +
            `来自疯狂动物城博客 🐰🦊`;

        navigator.clipboard?.writeText(ticketText).then(() => {
            if (window.ztNotify) {
                window.ztNotify('📤 罚单内容已复制到剪贴板', 'success');
            }
        });
    }

    function saveTicket() {
        if (window.ztNotify) {
            window.ztNotify('💾 罚单已保存到记录', 'success');
        }
    }

    // ========================================
    // 公共API
    // ========================================

    window.ZPDTicket = {
        /**
         * 显示罚单生成器
         */
        showGenerator: () => {
            showTicketGenerator();
        },

        /**
         * 生成罚单
         */
        generate: () => {
            generateTicketFromForm();
        },

        /**
         * 打印罚单
         */
        print: () => {
            printTicket();
        },

        /**
         * 分享罚单
         */
        share: () => {
            shareTicket();
        },

        /**
         * 保存罚单
         */
        save: () => {
            saveTicket();
        },

        /**
         * 快速生成随机罚单
         */
        quickGenerate: (options = {}) => {
            const ticket = generateTicket(options);
            return ticket;
        }
    };

    // ========================================
    // 快捷方式
    // ========================================

    window.ztShowZPDGenerator = () => window.ZPDTicket.showGenerator();
    window.ztGenerateZPDTicket = (options) => window.ZPDTicket.quickGenerate(options);

    // ========================================
    // 自动初始化浮动按钮
    // ========================================

    function addFloatingButton() {
        const button = document.createElement('button');
        button.className = 'zt-zpd-floating-btn';
        button.innerHTML = '👮';
        button.title = 'ZPD罚单生成器';
        button.onclick = () => showTicketGenerator();
        document.body.appendChild(button);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addFloatingButton);
    } else {
        addFloatingButton();
    }

    console.log('👮 疯狂动物城ZPD罚单系统已启动');

})(jQuery);
