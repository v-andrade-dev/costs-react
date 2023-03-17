import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './Project.module.css';

import Loading from '../../layout/loading/Loading';
import Container from '../../layout/container/Container';
import ProjectForm from '../../layout/project/ProjectForm';
import Message from '../../layout/message/Message';


function Project(){

    const { id } = useParams();
    const[project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState(); 

    useEffect(()=> {
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                },
            }).then((resp)=> resp.json()).then((data)=>{
                setProject(data);
            }).catch((err)=> console.log(err))
        }, 500)
    }, [id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    function editPost(project){
        if(project.budget < project.cost){
            setMessage("O custo não pode ser maior que o orçamento !");
            setType("error")
            return false;
        }
        
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(project),

        }).then((resp)=> resp.json().then((data)=> {
            setProject(data);
            setShowProjectForm(false);
            setMessage("Projeto atualizado!");
            setType("success")

        })).catch((err)=> console.log(err))
    }

    return (
        <>
            {project.name ? ( 
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span>{project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Orçamento utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                        handleSubmit={editPost}
                                        btnText="Salvar" 
                                        projectData={project} />
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : ( <Loading /> )}
        </>
    )
}

export default Project;