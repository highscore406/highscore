document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // !!! ВСТАВЬТЕ СВОИ ДАННЫЕ СЮДА !!!
    const TELEGRAM_BOT_TOKEN = '8547380410:AAFpnej1Gzu_Ly7GqA9-BzwW9A8UUqsE5Yc';
    const TELEGRAM_CHAT_ID = '6290391784';

    orderForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        // 1. Собираем данные из полей формы
        const name = orderForm.querySelector('input[type="text"]').value;
        const contact = orderForm.querySelector('input[type="tel"]').value;
        const subjectSelect = orderForm.querySelector('select');
        const subject = subjectSelect.options[subjectSelect.selectedIndex].text;
        const taskText = orderForm.querySelector('textarea').value;

        // 2. Формируем красивый текст сообщения для Telegram
        const message = `
⚡ *Новая заявка на HighScore!*
👤 *Имя:* ${name}
📞 *Связь:* ${contact}
📚 *Предмет:* ${subject}
📝 *Задание:* ${taskText}
        `;

        // 3. Отправляем запрос в Telegram API
        const url = `https://telegram.org{TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown' // Чтобы текст был с жирным шрифтом
            })
        })
        .then(response => {
            if (response.ok) {
                // Если всё ушло успешно, показываем наше всплывающее окно
                successModal.classList.add('active');
                orderForm.reset();
            } else {
                alert('Произошла ошибка при отправке. Пожалуйста, проверьте настройки токена.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось связаться с сервером. Проверьте интернет.');
        });
    });

    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (event) => {
        if (event.target === successModal) {
            successModal.classList.remove('active');
        }
    });
});
