import styles from './Home.module.css';
import savings from '../../../img/savings.svg';
import LinkButton from '../../layout/linkButton/LinkButton';


function Home(){
    return (
        <section className={styles.home_container}>
            <h1> Bem vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos!</p>
            <LinkButton to='/newproject' text='Criar Projeto' />
            <img src={savings} alt="costs imagem"></img>
        </section>
    )
}

export default Home;