import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaRegCopy } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
    LinkedinShareButton,
    LinkedinIcon,
    EmailShareButton,
    EmailIcon,
    ViberShareButton,
    ViberIcon,
    InstapaperShareButton,
    InstapaperIcon,
} from 'react-share';
import scss from './ShareModal.module.scss';

const ShareModal = ({ show, description, onToggle, name, productUrl, price, city, image, metaImage }) => {
    const maxDescriptionLength = 80;

    const trimmedDescription = description && description.length > maxDescriptionLength 
        ? `${description.slice(0, maxDescriptionLength)}...` 
        : description;

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains(scss.modalOverlay)) {
            onToggle();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(productUrl).then(() => {
            alert("Посилання скопійовано!");
        }).catch(err => {
            console.error('Помилка копіювання посилання', err);
        });
    };

    return (
        <>
            {/* Мета-теги для відображення фото і опису у соцмережах */}
            <Helmet>
                <meta property="og:title" content={name} />
                <meta property="og:description" content={description || `Ціна: ${price}, Локація: ${city}`} />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={productUrl} />
                <meta property="og:type" content="product" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={name} />
                <meta name="twitter:description" content={description || `Ціна: ${price}, Локація: ${city}`} />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:url" content={productUrl} />
            </Helmet>

            <AnimatePresence>
                {show && (
                    <motion.div
                        className={scss.modalOverlay}
                        onClick={handleOverlayClick}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={scss.modalContent}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <div className={scss.closeButton} onClick={onToggle}>
                                <FiX />
                            </div>
                            <h2>Поділитися продуктом: {name}</h2>
                            <p>Використовуйте наступні посилання для спільного використання:</p>
                            <ul>
                                <li>
                                    <FacebookShareButton url={productUrl} quote={trimmedDescription}>
                                        <FacebookIcon size={32} round />
                                        Facebook
                                    </FacebookShareButton>
                                </li>
                                <li>
                                    <WhatsappShareButton url={productUrl} title={trimmedDescription}>
                                        <WhatsappIcon size={32} round />
                                        WhatsApp
                                    </WhatsappShareButton>
                                </li>
                                <li>
                                    <TelegramShareButton url={productUrl} title={trimmedDescription}>
                                        <TelegramIcon size={32} round />
                                        Telegram
                                    </TelegramShareButton>
                                </li>
                                <li>
                                    <LinkedinShareButton url={productUrl} summary={trimmedDescription} source="PlatzUA">
                                        <LinkedinIcon size={32} round />
                                        LinkedIn
                                    </LinkedinShareButton>
                                </li>
                                <li>
                                    <EmailShareButton url={productUrl} subject={name} body={trimmedDescription}>
                                        <EmailIcon size={32} round />
                                        Email
                                    </EmailShareButton>
                                </li>
                                <li>
                                    <ViberShareButton url={productUrl} title={trimmedDescription}>
                                        <ViberIcon size={32} round />
                                        Viber
                                    </ViberShareButton>
                                </li>
                                <li>
                                    <button onClick={handleCopy}>
                                        <FaRegCopy /> Копіювати
                                    </button>
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ShareModal;
