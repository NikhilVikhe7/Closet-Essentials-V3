import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {mobile} from "../responsive";
import {useLocation} from "react-router-dom";
import {publicRequest, userRequest} from "../requestMethods";
import {addProduct, loadCart} from "../redux/cartRedux";
import {useDispatch, useSelector} from "react-redux";
import {updateCart} from "../redux/apiCalls";

const Container = styled.div`
`
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 800 500' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='100%25' id='blobSvg'%3E%3Cg transform='translate(351, 124)'%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color: rgb(76, 161, 175);'%3E%3C/stop%3E%3Cstop offset='100%25' style='stop-color: rgb(196, 224, 229);'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath class='blob' d='M426.5,357Q373,464,276,418.5Q179,373,130.5,311.5Q82,250,103.5,142Q125,34,229.5,69Q334,104,407,177Q480,250,426.5,357Z' fill='url(%23gradient)'%3E%3C/path%3E%3C/g%3E%3Cg transform='translate(-245, -193)'%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color: rgb(76, 161, 175);'%3E%3C/stop%3E%3Cstop offset='100%25' style='stop-color: rgb(196, 224, 229);'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath class='blob' d='M426.5,357Q373,464,276,418.5Q179,373,130.5,311.5Q82,250,103.5,142Q125,34,229.5,69Q334,104,407,177Q480,250,426.5,357Z' fill='url(%23gradient)'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  ${mobile({backgroundImage: "none", flexDirection: "column", padding: "10px"})}
`
const ImageContainer = styled.div`
  flex: 1;
  padding: 0 50px;
`
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({height: "40vh"})}
`
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({padding: "10px"})}
`
const Title = styled.div`
  font-weight: 200;
`

const Desc = styled.div`
  margin: 20px 0;
`

const Price = styled.span`
  font-weight: 100;
  font-size: 30px;
`

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({width: "100%"})}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid teal;
  background-color: ${props => props.color};
  margin: 0 5px;
  cursor: pointer;
`

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`

const FilterSizeOption = styled.option`

`

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({width: "100%"})}
`
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #f8f4f4;
  }
`

const Product = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`);
                console.log(id, product, "from use effect");
                setProduct(res.data);
                setSize(res.data.size[0]);
                setColor(res.data.size[0])
            } catch (err) {

            }
        }
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        console.log("quantity");
        if (type === 'dec') {
            if (quantity > 1) {
                setQuantity((prevQuantity) => {
                    return prevQuantity - 1;
                });
            }
        } else {
            setQuantity((prevQuantity) => {
                return prevQuantity + 1;
            });
        }
    }

    const handleClick = async  () => {
        if(user){
            const newProduct = {productId:product._id, img: product.img,title:product.title, quantity, color,size};
            // const res = await userRequest.put(`/carts/${cart._id}`, newProduct);
            await dispatch(addProduct({...product, quantity, color, size}))
            // const res = await userRequest.put(`/carts/${cart._id}`, cart);
            // dispatch(loadCart(res.data));
            alert("Item added Successfully")
        }else{
            alert("Please Sign-In before adding items to cart")
        }
    };

    useEffect( () =>{
        const updatecart = async ()=>{
            cart._id && await userRequest.put(`/carts/${cart._id}`, cart);
        }
        updatecart();
    },[cart])

    return (
        <Container>
            <Announcement></Announcement>
            <Navbar></Navbar>
            <Wrapper>
                <ImageContainer>
                    <Image src={product.img}></Image>
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}
                    </Desc>
                    <Price>₹{product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map(c => (
                                <FilterColor onClick={e => {
                                    setColor(c)
                                }} color={c} key={c}/>
                            ))}
                            {/*<FilterColor color="black"/>*/}
                            {/*<FilterColor color="darkblue"/>*/}
                            {/*<FilterColor color="gray"/>*/}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => {
                                setSize(e.target.value)
                            }}>
                                {product.size?.map(size => (
                                    <FilterSizeOption>{size}</FilterSizeOption>
                                ))}

                            </FilterSize>

                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <RemoveIcon onClick={() => handleQuantity('dec')}/>
                            <Amount>{quantity}</Amount>
                            <AddIcon onClick={() => handleQuantity('inc')}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>

                </InfoContainer>
            </Wrapper>
            <NewsLetter></NewsLetter>
            <Footer></Footer>
        </Container>
    );
};

export default Product;