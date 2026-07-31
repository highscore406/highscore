document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');

    // 1. Отображение названий прикрепленных файлов
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            fileList.innerHTML = ''; // Очищаем список перед выводом
            if (fileInput.files.length > 0) {
                const filesArray = Array.from(fileInput.files);
                filesArray.forEach(file => {
                    const fileItem = document.createElement('div');
                    fileItem.textContent = `✅ Выбран файл: ${file.name}`;
                    fileList.appendChild(fileItem);
                });
            }
        });
    }

    // 2. Обработка отправки формы и открытие модального окна
    if (orderForm) {
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Отменяем перезагрузку страницы

            // Здесь в будущем можно настроить реальную отправку данных на почту или в Telegram

            // Показываем окно успешной отправки
            successModal.classList.add('active');
            
            // Сбрасываем форму
            orderForm.reset();
            if (fileList) fileList.innerHTML = '';
        });
    }

    // 3. Закрытие модального окна
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }

    // Закрытие окна при клике на темную область вокруг него
    if (successModal) {
        successModal.addEventListener('click', (event) => {
            if (event.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
});
