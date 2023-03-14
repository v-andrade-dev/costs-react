import { useEffect, useState } from 'react';

import Input from '../../form/Input';
import Select from '../../form/Select';
import SubmitButton from '../../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({btnText}){

    const [categories, setCatecories] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },
        }).then((resp)=> resp.json()).then((data)=>{setCatecories(data)})
            .catch((err) => console.log(err));
    },[])

    return (
        <form className={styles.form}>
            <Input 
                type="text" 
                text="Nome do Projeto"
                name="name" 
                placeholder="Insira o nome do projeto">    
            </Input>
            <Input 
                type="number" 
                text="Orçamento do Projeto"
                name="budget" 
                placeholder="Insira o orçamento do projeto">    
            </Input>
            <Select 
                name="category_id"
                text="Selecione a categoria"
                options={categories}>    
            </Select>
            <SubmitButton text={btnText}></SubmitButton>

        </form>
    )
}

export default ProjectForm;