document.addEventListener('DOMContentLoaded', function() {
    // ---------- 筛选状态管理 ----------
    let currentCategory = 'all';
    let currentYear = 'all';
    let currentSearchTerm = '';

    const filterButtons = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    // 统一的筛选函数
    function applyFilters() {
        timelineItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const itemDate = item.querySelector('.date').textContent;
            const itemYear = itemDate.split('-')[0];
            const title = item.querySelector('h2').textContent.toLowerCase();
            const summary = item.querySelector('.summary').textContent.toLowerCase();

            // 检查分类条件
            const categoryMatch = currentCategory === 'all' || itemCategory === currentCategory;
            
            // 检查年份条件
            const yearMatch = currentYear === 'all' || itemYear === currentYear;
            
            // 检查搜索条件
            const searchMatch = currentSearchTerm === '' || 
                               title.includes(currentSearchTerm) || 
                               summary.includes(currentSearchTerm);

            // 只有同时满足所有条件才显示
            if (categoryMatch && yearMatch && searchMatch) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // ---------- 分类筛选 ----------
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的 active 类
            filterButtons.forEach(b => b.classList.remove('active'));
            // 给当前按钮加上 active
            this.classList.add('active');

            currentCategory = this.dataset.category;
            applyFilters();
        });
    });

    // ---------- 搜索框功能 ----------
    const allBtn = document.getElementById('all-btn');
    const yearBtn = document.getElementById('year-btn');
    const yearOptions = document.getElementById('year-options');
    const yearBtns = document.querySelectorAll('.year-btn');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // 年份按钮点击事件
    yearBtn.addEventListener('click', function() {
        // 切换年份选项的显示/隐藏
        if (yearOptions.style.display === 'none' || yearOptions.style.display === '') {
            yearOptions.style.display = 'flex';
        } else {
            yearOptions.style.display = 'none';
        }
    });

    // 全部按钮点击事件
    allBtn.addEventListener('click', function() {
        // 激活全部按钮
        allBtn.classList.add('active');
        yearBtn.classList.remove('active');
        // 隐藏年份选项
        yearOptions.style.display = 'none';
        // 重置年份状态
        currentYear = 'all';
        // 移除所有年份按钮的active状态
        yearBtns.forEach(b => b.classList.remove('active'));
        // 应用筛选
        applyFilters();
    });

    // 年份选项点击事件
    yearBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 激活当前年份按钮
            yearBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentYear = this.dataset.year;
            applyFilters();
        });
    });

    // 搜索功能
    function performSearch() {
        currentSearchTerm = searchInput.value.toLowerCase();
        applyFilters();
    }

    // 搜索按钮点击事件
    searchButton.addEventListener('click', performSearch);

    // 搜索框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 实时搜索（可选，如果需要实时搜索可以取消注释）
    // searchInput.addEventListener('input', performSearch);

    // ---------- 排序功能 ----------
    const sortBtns = document.querySelectorAll('.sort-btn');
    const timelineContainer = document.querySelector('.timeline');

    sortBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有排序按钮的active状态
            sortBtns.forEach(b => b.classList.remove('active'));
            // 给当前按钮加上active
            this.classList.add('active');

            const sortType = this.dataset.sort;
            sortTimelineItems(sortType);
        });
    });

    function sortTimelineItems(sortType) {
        const items = Array.from(timelineItems);
        
        items.sort((a, b) => {
            const dateA = a.querySelector('.date').textContent;
            const dateB = b.querySelector('.date').textContent;
            
            // 将日期字符串转换为Date对象进行比较
            const timeA = new Date(dateA).getTime();
            const timeB = new Date(dateB).getTime();
            
            if (sortType === 'newest') {
                // 最新动态：降序（新的在前）
                return timeB - timeA;
            } else {
                // 早期事件：升序（旧的在前）
                return timeA - timeB;
            }
        });

        // 重新排列DOM元素
        items.forEach(item => {
            timelineContainer.appendChild(item);
        });
    }

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
