import styles from './Card.module.css';

import {BsPencil, BsFillTrashFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Card({id, name, budget, category, handleRemove}){
    return(
        <div className={styles.card_container}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span>{category}
            </p>
            <div className={styles.card_container_actions}>
                <Link to='/'>
                    <BsPencil />Editar
                </Link>
                <button>
                    <BsFillTrashFill />Remover
                </button>
            </div>
        </div>
    )
}

export default Card;
