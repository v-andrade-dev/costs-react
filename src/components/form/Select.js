import styles from './Select.module.css';

function Select({ text, name, options, handleOnChange, value}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name}>
                <option>Selecione uma opção</option>
                {options.map((x)=> (
                    <option value={x.id} key={x.id}>
                        {x.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select;