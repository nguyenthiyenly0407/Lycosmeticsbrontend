import React, { useEffect } from 'react';

function CRMFORM() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js'; // Đường dẫn mã nhúng HubSpot
    script.async = true;
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "47442905", // Portal ID của bạn
          formId: "64a1cac0-0661-42a6-8e5b-a6ac7588b796", // Form ID của bạn
          target: "#hubspotForm" // ID của container form
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Chiều cao toàn màn hình
        flexDirection: 'column', // Để tiêu đề và form căn giữa theo chiều dọc
      }}
    >
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>HubSpot Form</h1>
      <div
        id="hubspotForm"
        style={{
          width: '100%', // Đảm bảo form chiếm toàn bộ chiều ngang container
          maxWidth: '600px', // Giới hạn chiều ngang form
        }}
      ></div>
    </div>
  );
}

export default CRMFORM;
