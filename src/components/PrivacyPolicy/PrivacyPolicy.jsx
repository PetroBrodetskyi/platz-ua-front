import scss from './PrivacyPolicy.module.scss';

const PrivacyPolicy = () => {
  return (
    <div>
      <ul className={scss.PrivacyContainer}>
        <li>
          <h2>Політика конфіденційності</h2>
          <p className={scss.text}>
            Ця політика конфіденційності пояснює, як ми збираємо,
            використовуємо, зберігаємо та захищаємо ваші персональні дані під
            час користування платформою PlatzUA. Ваше право на конфіденційність
            та захист особистої інформації є для нас пріоритетом, тому ми
            прагнемо забезпечити вас прозорою інформацією про наші процедури
            обробки даних.
          </p>
        </li>
        <li>
          <h3>1. Збір інформації</h3>
          <p className={scss.text}>
            1.1 Адміністратор збирає особисту інформацію, яку ви надаєте під час
            реєстрації та використання платформи. Це може включати: Ваше ім'я та
            прізвище, електронну адресу, номер телефону, адресу проживання, інші
            контактні дані.
          </p>
          <p className={scss.text}>
            1.2 Також ми можемо збирати автоматично отримані дані, такі як
            IP-адреса, тип пристрою, операційна система, браузер, налаштування
            мови, а також інформацію про те, як ви використовуєте платформу
            (наприклад, час входу, переглянуті сторінки).
          </p>
        </li>
        <li>
          <h3>2. Використання інформації</h3>
          <p className={scss.text}>
            2.1 Зібрані дані використовуються для надання послуг та
            функціональності платформи, зокрема обробки запитів користувачів,
            комунікації з вами, зокрема для відповіді на ваші запитання та
            надання підтримки, поліпшення користувацького досвіду шляхом аналізу
            поведінки користувачів та вдосконалення наших сервісів, адсилання
            важливих повідомлень, новин, оновлень і рекламних матеріалів, за
            умови отримання вашої згоди, виконання вимог законодавства, а також
            захисту прав та законних інтересів PlatzUA.
          </p>
        </li>
        <li>
          <h3>3. Захист даних</h3>
          <p className={scss.text}>
            3.1 Адміністратор вживає всіх необхідних технічних та організаційних
            заходів для захисту ваших даних від несанкціонованого доступу,
            втрати або знищення. Ми використовуємо шифрування для захисту даних
            під час передачі через Інтернет, застосовуємо засоби контролю
            доступу, щоб лише авторизовані особи могли отримати доступ до ваших
            даних, регулярно проводимо аудит наших систем безпеки для виявлення
            та усунення потенційних уразливостей. Всі дії здійснюються
            відповідно до вимог GDPR та національного законодавства України для
            забезпечення безпеки ваших персональних даних.
          </p>
        </li>
        <li>
          <h3>4. Передача даних третім особам</h3>
          <p className={scss.text}>
            4.1 Ваші дані можуть бути передані третім особам лише за вашою
            згодою або в межах необхідності для виконання наших зобов’язань.
            Зокрема, ми можемо передавати дані постачальникам послуг, які
            допомагають у підтримці та функціонуванні платформи PlatzUA
            (наприклад, постачальникам хостингу, аналітичним компаніям),
            відповідним державним органам у випадках, передбачених
            законодавством (наприклад, у відповідь на судовий запит), у випадку
            злиття, продажу або іншого переходу прав на активи PlatzUA, за
            умови, що передача даних буде регулюватися політикою
            конфіденційності.
          </p>
        </li>
        <li>
          <h3>5. Ваші права</h3>
          <p className={scss.text}>
            Ви маєте ряд прав щодо своїх персональних даних, які включають:
          </p>
          <ul>
            <li className={scss.text}>
              Право на доступ до своїх даних: ви можете отримати підтвердження
              про те, чи обробляються ваші персональні дані, а також запитати
              копію таких даних;
            </li>
            <li className={scss.text}>
              Право на виправлення: ви маєте право на виправлення неточних або
              неповних даних;
            </li>
            <li className={scss.text}>
              Право на видалення: ви можете вимагати видалення ваших даних у
              випадках, коли вони більше не потрібні для цілей обробки;
            </li>
            <li className={scss.text}>
              Право на обмеження обробки: ви можете вимагати обмеження обробки
              ваших даних за певних умов;
            </li>
            <li className={scss.text}>
              Право на перенесення даних: ви можете отримати свої дані в
              структурованому, загальновживаному та машинозчитувальному форматі;
            </li>
            <li className={scss.text}>
              Право на заперечення: ви можете заперечити проти обробки ваших
              даних у деяких випадках, наприклад, для маркетингових цілей.
            </li>
          </ul>
          <p className={scss.text}>
            Для реалізації цих прав, будь ласка, зв'яжіться з Адміністратором за
            електронною адресою{' '}
            <a className={scss.mailTo} href="mailto:petro.brodetskyi@gmail.com">
              petro.brodetskyi@gmail.com
            </a>
            .
          </p>
        </li>
        <li>
          <h3>6. Зміни до політики</h3>
          <p className={scss.text}>
            Адміністратор залишає за собою право вносити зміни до цієї політики
            конфіденційності. Всі оновлення будуть опубліковані на цій сторінці,
            і ми повідомимо вас про будь-які суттєві зміни через електронну
            пошту або через повідомлення на платформі.
          </p>
          <p className={scss.text}>
            Будь ласка, періодично перевіряйте цю сторінку для отримання
            актуальної інформації про нашу політику конфіденційності.
          </p>
        </li>
        <li>
          <h3>7. Внесення змін до цієї політики</h3>
          <p className={scss.text}>
            7.1 Ця політика конфіденційності була в останнє оновлена 21.03.2023.
            Компанія може час від часу оновлювати цю політику конфіденційності.
            Нова редакція вступає в силу з моменту її розміщення на нашому
            сайті. Чинна редакція політики завжди доступна на нашому веб-сайті.
          </p>
          <p className={scss.text}>
            7.2 Якщо ви не погоджуєтеся зі змінами, ви зобов'язані припинити
            використання сервісів PlatzUA. Продовження використання платформи
            підтверджує вашу згоду з новою редакцією політики.
          </p>
        </li>
        <li>
          <h3>8. Використання куків</h3>
          <p className={scss.text}>
            8.1 Наш веб-сайт використовує куки для покращення користувацького
            досвіду, аналізу використання платформи та для рекламних цілей. Куки
            - це маленькі файли, які зберігаються на вашому пристрої.
          </p>
          <p className={scss.text}>
            8.2 Ви можете контролювати куки через налаштування вашого браузера.
            Ви можете приймати або відхиляти куки, але це може вплинути на вашу
            здатність користуватися деякими функціями нашої платформи.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
