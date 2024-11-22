import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext.jsx';
import scss from './TermsOfService.module.scss';

const TermsOfService = () => {
  const sections = [
    {
      title: '1. Використання платформи',
      content: (
        <>
          <p className={scss.text}>
            1.1 Ви погоджуєтеся використовувати платформу лише в законних цілях.
            Забороняється використовувати платформу для будь-якої діяльності,
            яка може завдати шкоди або порушити права інших осіб.
          </p>
          <p className={scss.text}>
            1.2 Ви не повинні намагатися отримати несанкціонований доступ до
            системи або мережі платформи, а також використовувати будь-які
            методи для обходу заходів безпеки.
          </p>
        </>
      )
    },
    {
      title: '2. Користувацькі облікові записи',
      content: (
        <>
          <p className={scss.text}>
            2.1 Для доступу до певних функцій платформи вам може знадобитися
            створити обліковий запис. Ви несете відповідальність за
            конфіденційність вашого облікового запису і пароля.
          </p>
          <p className={scss.text}>
            2.2 Ви погоджуєтеся повідомляти нас про будь-які несанкціоновані
            використання вашого облікового запису або інші порушення безпеки.
          </p>
        </>
      )
    },
    {
      title: '3. Інтелектуальна власність',
      content: (
        <>
          <p className={scss.text}>
            3.1 Всі матеріали, представлені на платформі, включаючи текст,
            зображення, логотипи та програмне забезпечення, є власністю PlatzUA
            або третіх осіб і захищені відповідними законами про інтелектуальну
            власність.
          </p>
          <p className={scss.text}>
            3.2 Ви не маєте права копіювати, змінювати, розповсюджувати або
            іншим чином використовувати матеріали без попередньої письмової
            згоди відповідного власника.
          </p>
        </>
      )
    },
    {
      title: '4. Відповідальність',
      content: (
        <>
          <p className={scss.text}>
            4.1 Ви розумієте, що використовуєте платформу на свій ризик. PlatzUA
            не несе відповідальності за будь-які збитки, які можуть виникнути в
            результаті використання платформи або неможливості її використання.
          </p>
        </>
      )
    },
    {
      title: '5. Зміни до умов',
      content: (
        <>
          <p className={scss.text}>
            5.1 PlatzUA залишає за собою право вносити зміни до цих умов
            використання. Всі зміни будуть опубліковані на цій сторінці, і ми
            повідомимо вас про будь-які суттєві зміни через електронну пошту або
            через повідомлення на платформі.
          </p>
          <p className={scss.text}>
            5.2 Ваше продовження використання платформи після внесення змін
            підтверджує вашу згоду з новими умовами.
          </p>
        </>
      )
    },
    {
      title: '6. Контактна інформація',
      content: (
        <>
          <p className={scss.text}>
            6.1 Якщо у вас є запитання або коментарі щодо цих умов використання,
            будь ласка, зв'яжіться з нами за електронною адресою{' '}
            <a className={scss.mailTo} href="mailto:petro.brodetskyi@gmail.com">
              petro.brodetskyi@gmail.com
            </a>
            .
          </p>
        </>
      )
    }
  ];

  const { isDarkMode } = useTheme();

  return (
    <div className={scss.termsContainer}>
      <h4>Умови використання</h4>
      <div className={scss.termsContent}>
        <div>
          <p className={scss.infoText}>
            Ці умови використання регулюють ваше використання платформи PlatzUA.
            Використовуючи нашу платформу, ви погоджуєтеся дотримуватися цих
            умов. Якщо ви не згодні з цими умовами, будь ласка, не
            використовуйте нашу платформу.
          </p>
        </div>
        <div className={scss.menuInfo}>
          {sections.map((section, index) => (
            <Accordion
              key={index}
              className={`${scss.accordion} ${isDarkMode ? scss.darkMode : ''}`}
            >
              <AccordionSummary
                expandIcon={
                  <MdKeyboardArrowDown
                    className={`${scss.icon} ${isDarkMode ? scss.darkMode : ''}`}
                  />
                }
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h7">{section.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body3">{section.content}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
