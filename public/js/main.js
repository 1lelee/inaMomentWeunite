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

    // ---------- 回到顶部 ----------
    const backToTopBtn = document.getElementById('back-to-top');

    // 监听滚动事件
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add('show');
            backToTopBtn.style.display = "flex"; 
        } else {
            backToTopBtn.classList.remove('show');
            // 延迟隐藏，等待透明度动画完成
            setTimeout(() => {
                if(!backToTopBtn.classList.contains('show')) {
                    backToTopBtn.style.display = "none";
                }
            }, 300);
        }
    };

    // 点击平滑滚动到顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
