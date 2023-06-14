
import styled from 'styled-components';

const Styles = styled.div`
    padding: 20px;
    
    h1{border-botton: 1px solid white
    color : #3d3d3d;
    font-family : sans-serif;
    dont-size : 20px;
    font-weight: 600;
    line-heigh: 24 px;
    padding :10px;
    text-align:center;
    }

    table{
        border: solid;
        border-color: white;
    }
    th,
    td {
        padding: 15px;
        background-color: rgba(255,255,255,0.2);
        color: #000;
        border: solid;
        border-color: white;
    }
    tr:hover {background-color: #E6E6FA ;}
    th {
        text-align: left;
        color: #fff;
    }
    
    thead {
        th {
        background-color: #55608f;
        }
    }
    
    tbody {
        background-color: rgba(255,255,255,0.3);
        }
`

export{Styles};