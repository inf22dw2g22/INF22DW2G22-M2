import { Link } from 'react-router-dom';

export { Home };

function Home() {

    const imagePath = process.env.PUBLIC_URL + '/soft.PNG';
    const imagePath2 = process.env.PUBLIC_URL + '/users.png';
    const imagePath3 = process.env.PUBLIC_URL + '/produtos.png';
    const imagePath4 = process.env.PUBLIC_URL + '/clientes.png';
    const imagePath5 = process.env.PUBLIC_URL + '/faturas.png';
    return (
        <div>
        <div className="row mb-4">
            <img  src={imagePath} alt="cabecalho"></img>
        </div>
        <div className="row">
            <div className="col col-lg-3">
            <div class="card" style={{width: '12rem' }} >
            <img  src={imagePath2} alt="imagem users"></img>
                    <div class="card-body">
                        <h5 class="card-title">Users</h5>
                        <p class="card-text">Aceda aqui para gerir os users.</p>
                        <p><Link to="/users" className="btn btn-primary">Manage Users</Link></p>
                    </div>
            </div>
            </div>
            <div className="col col-lg-3">
            <div class="card" style={{width: '12rem' }} >
            <img  src={imagePath3} alt="imagem produtos"></img>
                    <div class="card-body">
                        <h5 class="card-title">Produtos</h5>
                        <p class="card-text">Aceda aqui para gerir os produtos.</p>
                        <p><Link to="/produtos" className="btn btn-primary">Manage Produtos</Link></p>
                    </div>
            </div>
            </div>
            <div className="col col-lg-3">
            <div class="card" style={{width: '12rem' }} >
            <img  src={imagePath4} alt="imagem produtos"></img>
                    <div class="card-body">
                        <h5 class="card-title">Clientes</h5>
                        <p class="card-text">Aceda aqui para gerir os clientes.</p>
                        <p><Link to="/clientes" className="btn btn-primary">Manage Clientes</Link></p>
                    </div>
            </div>
            </div>
            <div className="col col-lg-3">
            <div class="card" style={{width: '12rem' }} >
            <img  src={imagePath5} alt="imagem produtos"></img>
                    <div class="card-body">
                        <h5 class="card-title">Faturas</h5>
                        <p class="card-text">Aceda aqui para gerir as faturas.</p>
                        <p><Link to="/faturas" className="btn btn-primary">Manage Faturas</Link></p>
                    </div>
            </div>
            </div>

        </div>
        </div>
    );
}
