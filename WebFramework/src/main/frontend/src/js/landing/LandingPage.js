import Landing from "../../css/landing.module.css"
import logo from "../../images/landing/logo.png"
import sectionBg7 from "../../images/landing/section_bg7.png"
import sectionIcon1 from "../../images/landing/section_icon1.png"
import sectionIcon2 from "../../images/landing/section_icon2.png"
import sectionIcon3 from "../../images/landing/section_icon3.png"
import sectionIcon4 from "../../images/landing/section_icon4.png"
import sectionImg1 from "../../images/landing/section_img1.png"
import sectionImg2 from "../../images/landing/section_Img2.png"
import sectionImg4 from "../../images/landing/section_img4.png"
import sectionImg5 from "../../images/landing/section_img5.png"
import sectionImg6 from "../../images/landing/section_img6.png"
import profileImg1 from "../../images/profile_img1.jpg"
import footerLogo from "../../images/landing/footer_logo.png"
import {Link} from "react-router-dom";
import {cm} from "../utils/cm";
import {LandingReviewCard} from "./module/LandingReviewCard";
import {LandingSectionWrap} from "./module/LandingSectionWrap";
import {LandingVocItem} from "./module/LandingVocItem";

const vocItems = [
    {
        text: '이용 요금 상이',
        per: 20
    },
    {
        text: '중고폰 판매 대금 관련',
        per: 15
    },
    {
        text: '고객 약속 미이행 및 지연',
        per: 14
    },
    {
        text: '부가서비스 임의 가입 및 오안내',
        per: 13
    },
    {
        text: '할부 원금 및 개통 정보 오안내',
        per: 11
    },
    {
        text: '개통시 안내 미흡',
        per: 6
    },
    {
        text: '판매직원 불친절',
        per: 3
    },
    {
        text: '기타',
        per: 6
    },
    {
        text: '중고폰',
        per: 12
    }

]

export function LandingPage(){

    const smoothScrollTop = e=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className={Landing.landing}>
            <div className="container">

                <header className={Landing.header}>
                    <h1 className={Landing.logo}>
                        <div className={Landing.a} onClick={smoothScrollTop}>
                            <img className={Landing.img} src={logo} alt="momo"/>
                        </div>
                    </h1>
                    <div className={Landing.gnb}>
                        <div className={Landing.gnb_link}>
                            <ul className="link_list">
                                <li className={Landing.link_item}>
                                    <a className={Landing.a} href='/account/login'>로그인</a>
                                </li>
                                <li className={Landing.link_item}>
                                    <a href='/account/signup' className={cm(Landing.a, Landing.section_btn)}>무료로 시작하기</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>

                <main>
                    <article>
                        <LandingSectionWrap num={1}>
                            <div className={Landing.section_text_box}>
                                <h2 className={Landing.section_title}>핸드폰 매장 <br/>고객 관리 솔루션 <br/>모모</h2>
                                <p className={Landing.section_text}>올인원 고객관리 매니저 모모와 <br/>함께 준비하세요.</p>
                                <a href='account/signup' className={Landing.section_btn}>무료로 시작하기</a>
                            </div>
                            <img src={sectionImg1} alt="" className={Landing.section_img}/>
                        </LandingSectionWrap>

                        <LandingSectionWrap num={2}>
                            <div className={cm(Landing.section_box, Landing.n1)}>
                                <div className={Landing.section_text_box}>
                                    <h2 className={cm(Landing.section_title, Landing.add_icon)}>컴플레인 때문에 <br/>지치시죠?</h2>
                                    <p className={Landing.section_text}>모모가 제공하는 관리 매니저 서비를 통해 <br/>RVOC 발생률 감소를 직접
                                        경험해보세요.</p>
                                </div>

                                <div className={Landing.voc}>
                                    <div className={Landing.voc_title}>VOC 발생 유형</div>
                                    <ul className={Landing.voc_list}>
                                        {
                                            vocItems.map(({text,per},index)=>{
                                                return <LandingVocItem n={index+1} text={text} per={per}/>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className={cm(Landing.section_box, Landing.n2)}>
                                <div className={Landing.section_text_box}>
                                    <h2 className={cm(Landing.section_title, Landing.add_icon)}>컴플레인 0% <br/>솔루션</h2>
                                    <p className={Landing.section_text}>모모가 제공하는 관리 매니저 서비를 통해 <br/>RVOC 발생률 감소를 직접
                                        경험해보세요.</p>
                                </div>

                                <img src={sectionImg2} alt="" className={Landing.section_img}/>
                            </div>
                        </LandingSectionWrap>

                        <LandingSectionWrap num={3}>
                            <h2 className={Landing.section_title}><span className={Landing.span}>후기로 보는</span> 모모
                            </h2>

                            <div className={Landing.review}>
                                <ul className={Landing.review_list}>
                                    <LandingReviewCard active/>
                                    <LandingReviewCard/>
                                    <LandingReviewCard/>
                                    <LandingReviewCard/>
                                    <LandingReviewCard/>
                                    <LandingReviewCard/>
                                </ul>
                            </div>
                        </LandingSectionWrap>

                        <LandingSectionWrap num={4}>
                            <h2 className={cm(Landing.section_title, Landing.add_icon)}>한눈에 보이는 <br/>매장 현황 그래프</h2>
                            {/*<p className={cm(Landing.section_text)}>판매일보 작성시 자동으로 그래프가 생성되어 <br/>매장 현황 파악이 가능합니다.*/}
                            {/*    간편하게 관리하세요.</p>*/}
                            <img src={sectionImg4} alt="" className={Landing.section_img}/>
                        </LandingSectionWrap>

                        <LandingSectionWrap num={5}>
                            <h2 className={cm(Landing.section_title, Landing.add_icon)}>모모만의 <br/>확실한 관리 매니저</h2>
                            {/*<p className={cm(Landing.section_text)}>모모가 쌓아온 고객 관리 지식과 노하우를 기반으로 <br/>관리 매니저 서비스를*/}
                            {/*    제공합니다.</p>*/}
                            <img src={sectionImg5} alt="" className={Landing.section_img}/>
                        </LandingSectionWrap>

                        <LandingSectionWrap num={6}>
                            <h2 className={cm(Landing.section_title, Landing.add_icon)}>지정 날짜에 <br/>자동 전송되는 메세지</h2>
                            {/*<p className={Landing.section_text}>판매자에게는 편의를, <br/>구매자에게는 신뢰와 감동을 제공합니다.</p>*/}
                            <img src={sectionImg6} alt="" className={Landing.section_img}/>
                        </LandingSectionWrap>

                        <LandingSectionWrap num={7}>
                            <h2 className={cm(Landing.section_title, Landing.add_icon)}>모모를 <br/>지금 바로 사용해보세요!</h2>
                            <Link to='' className={Landing.section_btn}>무료로 시작하기</Link>
                        </LandingSectionWrap>
                    </article>
                </main>

                <footer className={Landing.footer}>
                    <div className={Landing.wrap}>
                    <img src={footerLogo} alt="momo" className={Landing.footer_logo}/>
                            <ul className={Landing.footer_info}>
                                <li className={Landing.li}><Link className={Landing.a} to=''>개인정보처리방침</Link></li>
                                <li className={Landing.li}><Link className={Landing.a} to=''>이용약관</Link></li>
                                <li className={Landing.li}>경기도 안양시 동안구 시민대로 311 1층 모모</li>
                                <li className={Landing.li}>사업자등록번호 000-00-00000</li>
                                <li className={Landing.li}>문의사항 0000-0000</li>
                            </ul>
                    </div>
                </footer>

            </div>

        </div>
    )
}