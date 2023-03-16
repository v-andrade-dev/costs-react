import { useEffect, useState } from 'react';

import Input from '../../form/Input';
import Select from '../../form/Select';
import SubmitButton from '../../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({handleSubmit, btnText, projectData}){

    const [categories, setCatecories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(()=>{
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },
        }).then((resp)=> resp.json()).then((data)=>{setCatecories(data)})
            .catch((err) => console.log(err));
    },[])

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    }

    function handleChange(e){
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleSelect(e){
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text="Nome do Projeto"
                name="name" 
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}>  
            </Input>
            <Input 
                type="number" 
                text="Orçamento do Projeto"
                name="budget" 
                placeholder="Insira o orçamento do projeto"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}>    
            </Input>
            <Select 
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleSelect}
                value={project.category ? project.category.id : ''}>    
            </Select>
            <SubmitButton text={btnText}></SubmitButton>

        </form>
    )
}

export default ProjectForm;