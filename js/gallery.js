var gallery = document.querySelector('#gallery');

// Lấy giá trị của style từ các phần tử
var getVal = function (elem, style) {
  return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
};

// Lấy chiều cao của phần tử chứa ảnh
var getHeight = function (item) {
  return item.querySelector('.content').getBoundingClientRect().height;
};

// Cập nhật chiều cao cho tất cả các phần tử trong gallery khi resize
var resizeAll = function () {
  var altura = getVal(gallery, 'grid-auto-rows');
  var gap = getVal(gallery, 'grid-row-gap');
  gallery.querySelectorAll('.gallery-item').forEach(function (item) {
    var el = item;
    el.style.gridRowEnd =
      'span ' + Math.ceil((getHeight(item) + gap) / (altura + gap));
  });
};

// Xử lý ảnh tải xong
gallery.querySelectorAll('img').forEach(function (item) {
  item.classList.add('byebye');
  if (item.complete) {
    console.log(item.src);
    item.classList.remove('byebye');  // Nếu ảnh đã tải xong thì hiển thị ngay
  } else {
    item.addEventListener('load', function () {
      var altura = getVal(gallery, 'grid-auto-rows');
      var gap = getVal(gallery, 'grid-row-gap');
      var gitem = item.parentElement.parentElement;
      gitem.style.gridRowEnd =
        'span ' + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
      item.classList.remove('byebye');  // Khi ảnh tải xong thì loại bỏ class "byebye"
    });
  }
});

// Lắng nghe sự kiện resize cửa sổ để cập nhật layout
window.addEventListener('resize', resizeAll);

// Tối ưu việc mở và đóng chế độ full ảnh
gallery.querySelectorAll('.gallery-item').forEach(function (item) {
  item.addEventListener('click', function () {
    // Nếu ảnh chưa ở chế độ full thì mở
    if (!item.classList.contains('full')) {
      // Đảm bảo chỉ mở full ảnh nếu nó chưa ở trạng thái đó
      item.classList.add('full');
    } else {
      // Nếu ảnh đang ở chế độ full thì thu nhỏ lại
      item.classList.remove('full');
    }
  });
});

// Đảm bảo ảnh luôn hiển thị với chiều cao và chiều rộng phù hợp trong grid
gallery.querySelectorAll('.gallery-item img').forEach(function (item) {
  item.addEventListener('load', function () {
    // Đảm bảo ảnh không bị kéo giãn hoặc co dãn lệch tỷ lệ
    item.style.objectFit = 'cover';
    item.style.width = '100%';
    item.style.height = '100%';
  });
});

// Tự động tính toán lại layout khi ảnh được tải xong hoặc thay đổi kích thước
gallery.querySelectorAll('.gallery-item img').forEach(function (item) {
  if (item.complete) {
    var altura = getVal(gallery, 'grid-auto-rows');
    var gap = getVal(gallery, 'grid-row-gap');
    var gitem = item.parentElement.parentElement;
    gitem.style.gridRowEnd =
      'span ' + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
  }
});

// Khởi động resize khi tải trang
window.addEventListener('load', resizeAll);
