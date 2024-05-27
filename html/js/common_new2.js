document.addEventListener("DOMContentLoaded", function() {
    (function () {
      //dropdown menu
        const dropdownMenus = document.querySelectorAll('.dropdown_menu_wrap');

      function handleDropdownMenu(menu) {
            const selectedOptionButton = menu.querySelector('.btn-dropdown');
            const optionList = menu.querySelectorAll('.dropdown_list li button');

        function toggleMenu() {
                dropdownMenus.forEach(m => {
            if (m !== menu) {
                        m.classList.remove('is-active');
                        m.querySelector('.btn-dropdown').classList.remove('is-active');
                        m.querySelector('.dropdown_list').classList.remove('is-active');
            }
          });
                menu.classList.toggle('is-active');
                selectedOptionButton.classList.toggle('is-active');
                selectedOptionButton.nextElementSibling.classList.toggle('is-active');
        }

            selectedOptionButton.addEventListener('click', toggleMenu);

            optionList.forEach(option => {
                option.addEventListener('click', () => {
                    const selectedValue = option.getAttribute('data-option');
            selectedOptionButton.textContent = selectedValue;

                    menu.querySelectorAll('.dropdown_list li').forEach(item => {
                        item.classList.remove('is-active');
            });

                    option.parentElement.classList.add('is-active');
            toggleMenu();
          });
        });

        document.addEventListener("click", function (e) {
                if (menu.classList.contains('is-active') && !e.target.closest('.dropdown_menu_wrap')) {
                    menu.classList.remove('is-active');
                    selectedOptionButton.classList.remove('is-active');
                    selectedOptionButton.nextElementSibling.classList.remove('is-active');
          }
        });
      }

      dropdownMenus.forEach(handleDropdownMenu);

      //toggle
        const toggleButtons = document.querySelectorAll('.is-toggle');
        toggleButtons && toggleButtons.forEach(toggle => {
          toggle.addEventListener("click", function (e) {
                const activeButton = document.querySelector('.is-toggle.is-active')
                activeButton && activeButton.classList.remove('is-active')                
                toggle.classList.toggle('is-active');
          });
        });

      // product list select tab
        const tabItems = document.querySelectorAll('.tab-menu-item');
        tabItems && tabItems.forEach(tab => {
          tab.addEventListener("click", function (e) {
                document.querySelector('.tab-menu-item.active').classList.remove('active');
                tab.classList.toggle('active');
                const type = tab.getAttribute('view-type');
            console.log(type);
                document.querySelector('.product_view_type.active').classList.remove('active');
                document.querySelector(`#${type}`).classList.add('active');
          });
        });

      // sale acc
        const saleAccs = document.querySelectorAll('.sales_info_scroll ul > .sale_item');
        saleAccs && saleAccs.forEach(acc => {
          acc.addEventListener("click", function (e) {
                acc.classList.toggle('is-active');            
          });
        });

        const viewDeliveryTimes = document.querySelectorAll('.btn_open_sale_detail');

        viewDeliveryTimes.forEach(btn => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();

                btn.classList.toggle('is-active');

          const nextElement = btn.nextElementSibling;
          if (nextElement) {
                    nextElement.classList.toggle('is-active');
          }
        });
      });


      // 수량 조절
        const quantityInput = document.getElementById('quantityInput');
        const btnMinus = document.querySelector('.btn_minus');
        const btnPlus = document.querySelector('.btn_plus');

        btnMinus && btnMinus.addEventListener('click', () => {
          let currentQuantity = parseInt(quantityInput.value);
          if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
          }
        });

      btnPlus &&
        btnPlus.addEventListener("click", () => {
          let currentQuantity = parseInt(quantityInput.value);
          quantityInput.value = currentQuantity + 1;
        });
      // 상품 - 다른 판매처 영역 선택하면 이전에 선택한 판매처 하단의 내용은 접히도록 수정 (2024.05.23)
      const saleAccs2 = document.querySelectorAll(".sales_info_scroll.sales_type2 ul > .sale_item.type2-item");
      saleAccs2.forEach((acc) => {
        acc.addEventListener("click", function (e) {
          // Close all items
          saleAccs2.forEach((item) => {
            if (item !== acc) {
              item.classList.remove("is-active");
            } else if (item !== acc) {
              item.classList.add("is-active");
            }
          });
        });
      });
    })();
});