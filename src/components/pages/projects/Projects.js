import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './Projects.module.css';

import Message from '../../layout/message/Message';
import LinkButton from '../../layout/linkButton/LinkButton';
import Container from '../../layout/container/Container';
import Card from '../../layout/card/Card';

function Projects(){

    const [projects, setProjects] = useState([]);


    const location = useLocation();
    let message = '';
    if(location.state){
        message = location.state.message;
    }

    useEffect(()=>{
        fetch('http://localhost:5000/projects',{
            method:'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then((resp)=> resp.json()).then((data)=>{
            setProjects(data);
            console.log(data);
        }).catch((err)=> console.log(err));
    },[])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projetos Cadastrados</h1>
                <LinkButton to='/newproject' text='Criar Projeto'></LinkButton>
            </div>
            <div>
                {message && <Message type="success" msg={message} />}
                <Container customClass="start">
                    {projects.length > 0 &&
                        projects.map((project)=>
                            <Card 
                                name={project.name}
                                id={project.id}
                                budget={project.budget}
                                category={project.category.name}
                                key={project.id} />
                        )}
                </Container>
            </div>
            
            
            
        </div>
    )
}

export default Projects;