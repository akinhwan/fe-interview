import { useEffect, useState } from 'react';
import DisabledCard from '../../DisabledProductCard/DisabledCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserSells } from '../../../services/userData';

import './Sells.css';
import '../../DisabledProductCard/DisabledCard.css'
function ArchivedSells({ history }) {
    const [products, setProduct] = useState([])
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserSells()
            .then(res => {
                setProduct(res.sells);
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [setProduct, setLoading])

    return (
        <>

            {!loading ?
                (<>
                    <h1 className="heading">Archive</h1>
                    {products.filter(x => x.active === false).length > 0 ? (
                        <Row>
                            {products
                                .filter(x => x.active === false)
                                .map(x =>
                                    <Col xs={12} md={6} lg={4} key={x._id.toString()}>
                                        <DisabledCard params={x} history={history} />
                                    </Col>
                                )
                            }
                        </Row>
                    ) : (
                            <p className="nothing-to-show">Nothing to show</p>
                        )
                    }
                </>) :
                <Spinner animation="border" />}
        </>
    )
}

export default ArchivedSells;