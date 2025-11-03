import { Link } from "react-router-dom";
import './style.scss'

const Footer = () => {
  return (
    <div className="footer">
      <Link to="https://vk.com/id98418965" className={`footer__icon footer__icon-vk`} />
      <Link to="https://www.youtube.com/" className={`footer__icon footer__icon-youtube`} />
      <Link to="https://ok.ru/" className={`footer__icon footer__icon-ok`} />
      <Link to="https://t.me/xjuer7" className={`footer__icon footer__icon-tg`} />
    </div>
  );
};

export default Footer;
