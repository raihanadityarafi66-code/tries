// ══════════════════════════════════════════
//  QR GENERATOR
// ══════════════════════════════════════════

const qrInput       = document.getElementById('qrLinkInput');
const qrGenerateBtn = document.getElementById('qrGenerateBtn');
const qrPreview     = document.getElementById('qrPreview');
const qrCanvas      = document.getElementById('qrCanvas');
const qrDownloadBtn = document.getElementById('qrDownloadBtn');
const qrShareBtn    = document.getElementById('qrShareBtn');

// Popup elements
const qrPopup        = document.getElementById('qrPopup');
const qrPopupClose   = document.getElementById('qrPopupClose');
const qrPopupCancel  = document.getElementById('qrPopupCancel');
const qrPopupConfirm = document.getElementById('qrPopupConfirm');
const qrFileNameInput = document.getElementById('qrFileName');

let currentQRUrl = '';

// ── Draw QR on canvas using qrcode.js ──
function drawQRToCanvas(url, size) {
  const ctx = qrCanvas.getContext('2d');
  qrCanvas.width  = size;
  qrCanvas.height = size;
  ctx.clearRect(0, 0, size, size);

  // We use a hidden div to generate QR, then rasterise it
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top  = '-9999px';
  document.body.appendChild(tempDiv);

  // QRCode generates an <img> with a data URL
  const qr = new QRCode(tempDiv, {
    text:          url,
    width:         size,
    height:        size,
    colorDark:     '#1a1a2e',
    colorLight:    '#ffffff',
    correctLevel:  QRCode.CorrectLevel.H,
  });

  // Wait for the image to render then draw to canvas
  setTimeout(() => {
    const img = tempDiv.querySelector('img') || tempDiv.querySelector('canvas');
    if (img) {
      if (img.tagName === 'IMG') {
        const tempImg = new Image();
        tempImg.onload = () => {
          ctx.drawImage(tempImg, 0, 0, size, size);
          addLogoWatermark(ctx, size);
        };
        tempImg.src = img.src;
      } else {
        // canvas-based QRCode
        ctx.drawImage(img, 0, 0, size, size);
        addLogoWatermark(ctx, size);
      }
    }
    document.body.removeChild(tempDiv);
  }, 100);
}

// ── Add a subtle centre watermark ──
function addLogoWatermark(ctx, size) {
  const cx = size / 2;
  const cy = size / 2;
  const r  = size * 0.07;

  // White circle background
  ctx.beginPath();
  ctx.arc(cx, cy, r + 2, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();

  // Blue mini circle
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#1976d2';
  ctx.fill();

  // 'R' initial
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${Math.round(r * 1.1)}px Maven Pro, DM Sans, sans-serif`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('R', cx, cy + 1);
}

function isValidLink(str) {
  const pattern =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/?#].*)?$/i;

  return pattern.test(str);
}

// ── Generate ──
qrGenerateBtn.addEventListener('click', () => {
  let url = qrInput.value.trim();
  const inputWrap = qrInput.closest('.qr-input-wrap');

  // Empty input
  if (!url) {
    qrInput.focus();
    inputWrap.style.borderColor = '#ef5350';

    showToast('⚠️ Please enter a URL.');

    setTimeout(() => {
      inputWrap.style.borderColor = '';
    }, 1200);

    return;
  }

  // Validate link format
  if (!isValidLink(url)) {
    qrInput.focus();
    inputWrap.style.borderColor = '#ef5350';

    showToast('❌ Input harus berupa link');

    setTimeout(() => {
      inputWrap.style.borderColor = '';
    }, 1500);

    return;
  }

  // Add https:// automatically if omitted
  if (
    !url.startsWith('http://') &&
    !url.startsWith('https://')
  ) {
    url = 'https://' + url;
  }

  // Generate QR
  currentQRUrl = url;

  qrPreview.style.display = 'block';
  drawQRToCanvas(url, 400);

  setTimeout(() => {
    qrPreview.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }, 150);
});

// Trigger on Enter
qrInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') qrGenerateBtn.click();
});

// ── Download button → open popup ──
qrDownloadBtn.addEventListener('click', () => {
  if (!currentQRUrl) return;
  openPopup();
});

// ── Share button ──
qrShareBtn.addEventListener('click', async () => {
  if (!currentQRUrl) return;

  if (navigator.share) {
    try {
      qrCanvas.toBlob(async (blob) => {
        const file = new File([blob], 'qrcode.png', { type: 'image/png' });
        await navigator.share({
          title: 'QR Code',
          text:  'QR Code dari ' + currentQRUrl,
          files: [file],
        });
      });
    } catch (_) {
      copyCanvasToClipboard();
    }
  } else {
    copyCanvasToClipboard();
  }
});

function copyCanvasToClipboard() {
  qrCanvas.toBlob((blob) => {
    try {
      const item = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([item]).then(() => {
        showToast('QR code disalin ke clipboard! 📋');
      });
    } catch (_) {
      showToast('Browser tidak mendukung salin gambar.');
    }
  });
}

// ── Popup helpers ──
function openPopup() {
  qrPopup.classList.add('active');
  document.body.style.overflow = 'hidden';
  qrFileNameInput.focus();
  qrFileNameInput.select();
}

function closePopup() {
  qrPopup.classList.remove('active');
  document.body.style.overflow = '';
}

qrPopupClose.addEventListener('click',  closePopup);
qrPopupCancel.addEventListener('click', closePopup);

// Close on overlay click
qrPopup.addEventListener('click', (e) => {
  if (e.target === qrPopup) closePopup();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && qrPopup.classList.contains('active')) closePopup();
});

// ── Confirm download ──
qrPopupConfirm.addEventListener('click', () => {
  const fileName = (qrFileNameInput.value.trim() || 'qrcode') + '.png';
  const sizeVal  = parseInt(document.querySelector('input[name="qrSize"]:checked').value);

  // Re-render at chosen size then download
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width  = sizeVal;
  tempCanvas.height = sizeVal;

  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  document.body.appendChild(tempDiv);

  const qr = new QRCode(tempDiv, {
    text:         currentQRUrl,
    width:        sizeVal,
    height:       sizeVal,
    colorDark:    '#1a1a2e',
    colorLight:   '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  });

  setTimeout(() => {
    const img = tempDiv.querySelector('img') || tempDiv.querySelector('canvas');
    if (img) {
      const ctx = tempCanvas.getContext('2d');

      const doDownload = () => {
        addLogoWatermark(ctx, sizeVal);
        const link  = document.createElement('a');
        link.download = fileName;
        link.href   = tempCanvas.toDataURL('image/png');
        link.click();
        document.body.removeChild(tempDiv);
        closePopup();
        showToast(`✅ Tersimpan sebagai "${fileName}" (${sizeVal}×${sizeVal})`);
      };

      if (img.tagName === 'IMG') {
        const tmpImg = new Image();
        tmpImg.onload = () => {
          ctx.drawImage(tmpImg, 0, 0, sizeVal, sizeVal);
          doDownload();
        };
        tmpImg.src = img.src;
      } else {
        ctx.drawImage(img, 0, 0, sizeVal, sizeVal);
        doDownload();
      }
    }
  }, 100);
});

// ── Toast notification ──
function showToast(msg) {
  let toast = document.querySelector('.qr-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'qr-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #1a1a2e;
      color: #fff;
      padding: 11px 22px;
      border-radius: 40px;
      font-size: 13px;
      font-family: 'Inter', 'DM Sans', sans-serif;
      font-weight: 500;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      z-index: 9999;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
      white-space: nowrap;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 3000);
}