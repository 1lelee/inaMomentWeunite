document.addEventListener('DOMContentLoaded', function() {
    // ---------- 分类筛选 ----------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的 active 类
            filterButtons.forEach(b => b.classList.remove('active'));
            // 给当前按钮加上 active
            this.classList.add('active');

            const category = this.dataset.category; // 'all' 或颜色名

            timelineItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'flex'; // 显示
                } else {
                    item.style.display = 'none';  // 隐藏
                }
            });
        });
    });

    // ---------- 展开/折叠 ----------
    document.querySelectorAll('.toggle-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const details = this.closest('.timeline-content').querySelector('.expanded-details');
            if (details.style.display === 'none') {
                details.style.display = 'block';
                this.textContent = '收起';
            } else {
                details.style.display = 'none';
                this.textContent = '展开';
            }
        });
    });
});