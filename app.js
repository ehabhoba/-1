const scriptURL = 'https://script.google.com/macros/s/AKfycbw5Sk0nK9UKHhsRCupN_B30sibSr9q_aEP77KBoc1rckCn7qJ_Vfg4yDqrM11pY1hxzYQ/exec';

const form = document.getElementById('leadForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('service', service);

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert(`✅ تم إرسال البيانات بنجاح، تابع رسائلك على واتساب يا ${name}!`);

      const whatsappMessage = encodeURIComponent(`السلام عليكم ${name}، شكراً لتسجيلك في خدمة ${service} مع EhabGM. فريقنا هيتواصل معاك قريبًا.`);
      const whatsappNumber = phone.replace(/[^0-9]/g, '');
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      window.open(whatsappURL, '_blank');

      form.reset();
    } else {
      alert('❌ حصل خطأ أثناء الإرسال. حاول تاني.');
    }

  } catch (error) {
    console.error('خطأ:', error);
    alert('❌ حصل خطأ أثناء الاتصال بالسيرفر.');
  }
});
