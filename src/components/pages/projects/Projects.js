import { useLocation } from 'react-router-dom';

import styles from './Projects.module.css';

import Message from '../../layout/message/Message';
import LinkButton from '../../layout/linkButton/LinkButton';
import Container from '../../layout/container/Container';

function Projects(){

    const location = useLocation();
    let message = '';
    if(location.state){
        message = location.state.message;
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projetos Cadastrados</h1>
                <LinkButton to='/newproject' text='Criar Projeto'></LinkButton>
            </div>
            <div>
                {message && <Message type="success" msg={message} />}
                <Container customClass="start">
                    <p>Projetos</p>
                </Container>
            </div>
            
            
            
        </div>
    )
}

export default Projects;