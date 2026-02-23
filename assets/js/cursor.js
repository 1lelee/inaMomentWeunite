document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('customCursor');
  if (!cursor) return;

  // 鼠标位置（目标点）
  let mouseX = 0, mouseY = 0;
  // 当前光标位置（用于缓动）
  let cursorX = 0, cursorY = 0;

  // 缓动系数（0~1），越小越“拖尾”
  const speed = 0.2;

  // 监听鼠标移动
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 动画循环：平滑移动
  function animate() {
    // 计算偏移量并应用缓动
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animate);
  }
  animate();

  // 鼠标离开窗口时隐藏光标
  document.addEventListener('mouseleave', () => {
    cursor.classList.add('hidden');
  });
  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('hidden');
  });

  // 点击特效
  document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
  });
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
  });

  // 为可交互元素添加悬停效果（可选）
  const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
});