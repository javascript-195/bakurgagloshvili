
    const pageSelector = document.getElementById('pageSelector'); // ახლა ეს არის DIV
    const burgerIcon = document.getElementById('burgerIcon'); 
    
    // ხატულას შეცვლის ფუნქცია
    const toggleIcon = (isOpen) => {
        if (isOpen) {
            burgerIcon.classList.remove('fa-bars');
            burgerIcon.classList.add('fa-times'); // ჯვარი (დახურვა)
        } else {
            burgerIcon.classList.remove('fa-times'); 
            burgerIcon.classList.add('fa-bars'); // ბურგერი (გახსნა)
        }
    };


    if (pageSelector && burgerIcon) {
        
        // 1. ბურგერის ხატულაზე დაჭერისას მენიუს გახსნა/დახურვა (Toggle)
         burgerIcon.addEventListener('click', (event) => {
             // ეს toggle('active') კლასი მართავს CSS-ის display: none/block-ს
             pageSelector.classList.toggle('active');
             
             // ხატულას შეცვლა
             const isMenuOpen = pageSelector.classList.contains('active');
             toggleIcon(isMenuOpen);
             
             // შეჩერება, რომ ივენთი არ გავრცელდეს და მენიუ არ დაიხუროს
             event.stopPropagation();
         });
         
         // 2. მენიუს დახურვა სადმე სხვაგან დაჭერისას (გარდა მენიუსი და ბურგერისა)
         document.addEventListener('click', (event) => {
            if (pageSelector.classList.contains('active') && 
                !pageSelector.contains(event.target) && 
                event.target !== burgerIcon) {
                
                pageSelector.classList.remove('active');
                toggleIcon(false);
            }
         });
         
         // 3. მენიუს დახურვა ლინკზე დაჭერისას (გვერდზე გადასვლის შემდეგ)
         pageSelector.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                 // გვერდზე გადასვლამდე მენიუ იმალება
                 pageSelector.classList.remove('active');
                 toggleIcon(false);
                 // გვერდზე გადასვლა მოხდება ავტომატურად (href-ის გამო)
             });
         });
    }

