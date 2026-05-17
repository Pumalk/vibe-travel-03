/**
 * Кастомные выпадающие списки для фильтров.
 * Заменяет нативные <select> с классом .filter-select на стилизованные блоки.
 */

function initCustomSelects() {
    document.querySelectorAll('.filter-select').forEach(select => {
        if (select.dataset.customSelectInit === 'true') return;
        select.dataset.customSelectInit = 'true';

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'custom-select__button';
        button.textContent = select.options[select.selectedIndex]?.text || '';

        const dropdown = document.createElement('div');
        dropdown.className = 'custom-select__dropdown';

        Array.from(select.options).forEach(option => {
            const item = document.createElement('div');
            item.className = 'custom-select__option';
            item.textContent = option.text;
            item.dataset.value = option.value;
            if (option.selected) {
                item.classList.add('selected');
                button.textContent = option.text;
            }
            item.addEventListener('click', () => {
                dropdown.querySelectorAll('.custom-select__option').forEach(opt => opt.classList.remove('selected'));
                item.classList.add('selected');
                button.textContent = item.textContent;
                select.value = item.dataset.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                closeDropdown();
            });
            dropdown.appendChild(item);
        });

        const closeDropdown = () => {
            dropdown.classList.remove('open');
            button.classList.remove('open');
        };

        button.addEventListener('click', () => {
            const isOpen = dropdown.classList.contains('open');

            // Закрываем все остальные открытые меню
            document.querySelectorAll('.custom-select__dropdown.open').forEach(d => d.classList.remove('open'));
            document.querySelectorAll('.custom-select__button.open').forEach(b => b.classList.remove('open'));

            if (!isOpen) {
                // Временно перемещаем меню в body, чтобы избежать проблем с stacking context
                document.body.appendChild(dropdown);

                // Позиционируем относительно кнопки
                const btnRect = button.getBoundingClientRect();
                dropdown.style.position = 'fixed';
                dropdown.style.top = (btnRect.bottom + 4) + 'px';
                dropdown.style.left = btnRect.left + 'px';
                dropdown.style.width = btnRect.width + 'px';

                dropdown.classList.add('open');
                button.classList.add('open');
            } else {
                closeDropdown();
                // Возвращаем dropdown обратно в обёртку
                wrapper.appendChild(dropdown);
            }
        });

        // Закрытие при клике вне
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target) && !dropdown.contains(e.target) && dropdown.classList.contains('open')) {
                closeDropdown();
                wrapper.appendChild(dropdown);
            }
        });

        wrapper.appendChild(button);
        wrapper.appendChild(dropdown);

        // Скрываем оригинальный select
        select.style.position = 'absolute';
        select.style.opacity = '0';
        select.style.pointerEvents = 'none';
        select.style.width = '1px';
        select.style.height = '1px';
        select.tabIndex = -1;
        select.ariaHidden = 'true';

        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
    });
}