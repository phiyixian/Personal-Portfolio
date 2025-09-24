document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('name');
    const text = container.textContent.trim();
    const words = text.split(/\s+/)

    // clear container
    container.textContent = '';

    const baseDelay = 500;
    const stagger = 1000; // ms
    const distance = 200; // pixels

    words.forEach((word, wordIndex) => {
        const wordWrap = document.createElement('span');
        wordWrap.className = 'word';

        const chars = Array.from(word);
        const center = (chars.length - 1) / 2;

        const distFromCenter = chars.map((_, i) => Math.abs(i - center));
        const maxDist = Math.max(...distFromCenter);

        chars.forEach((char, charIndex) => {
            const span = document.createElement('span');
            span.className = 'char init';
            span.textContent = char;
            // negative for left and positive for right
            const offset = charIndex - center;
            const startX = offset * distance;

            const startY = (Math.random() - 0.5) * 1000; // -5 to 5px random number for different Y position
            const startRot = (Math.random() - 0.5) * 6; // -3..3 deg
            
            // Set CSS variables (not transform/opacity directly)
            span.style.setProperty('--start-x', `${startX}px`);
            span.style.setProperty('--start-y', `${startY}px`);
            span.style.setProperty('--start-rot', `${startRot}deg`);
            span.style.fontSize = Math.random() * 0.7 + 1 + 'em'; // random font size between 0.7em to 1.7em
            span.style.color = `hsl(32, 80%, ${Math.random() * 20 + 5}%)`; // random color

            const outerPriority = maxDist - distFromCenter[charIndex];
            const delay = baseDelay + outerPriority * stagger + wordIndex * 120; //stagger words by 0.12s
            span.style.transitionDelay = `${delay}ms`;
            
            wordWrap.appendChild(span);
        });

        container.appendChild(wordWrap);
    });

    // force reflow so browser register initial style
    void container.offsetWidth;

    // set time out to ensure transitionDelay is applied
    setTimeout(() => {
        container.classList.add('in');
        // also remove 'init' class so CSS target styles apply  (optional)
        document.querySelectorAll('.char.init').forEach(s => s.classList.remove('init'));
  }, 30); // small tick
});