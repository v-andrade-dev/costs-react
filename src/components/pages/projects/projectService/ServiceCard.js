import styles from '../../../layout/card/Card.module.css';

import {BsFillTrashFill} from 'react-icons/bs';

function ServiceCard({id, name, cost,  description, handleRemove}){

    const remove = (e)=> {
        e.preventDefault();
        handleRemove(id, cost);
    }

    return(
    <div className={styles.card_container}> 
        <h4>{name}</h4>
        <p>
            <span>Custo total: </span>{cost}
        </p>

        <p>
            {description}
        </p>

        <div className={styles.card_container_actions}>
            <button onClick={remove}>
                <BsFillTrashFill />
                Excluir
            </button>
        </div>
    </div>
    )
}

export default ServiceCard;