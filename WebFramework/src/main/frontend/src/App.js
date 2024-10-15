import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import ModalContainer from "./js/common/modal/ModalContainer";
import {Route, Routes} from "react-router-dom";
import {AccountLayout} from "./js/layout/AccountLayout";
import Login from "./js/account/Login";
import {Signup} from "./js/account/Signup";
import {Role} from "./js/account/Role";
import {SelectShop} from "./js/shop/SelectShop";
import MainLayout from "./js/layout/MainLayout";
import Authorization from "./common/Authorization";
import {RegisterShop} from "./js/shop/RegisterShop";
import {FindUsername} from "./js/account/FindUsername";
import {FindPassword} from "./js/account/FindPassword";
import {ManageStaff} from "./js/staff/ManageStaff";
import {Profile} from "./js/profile/Profile";
import {Sale} from "./js/service/sale/Sale";
import {Task} from "./js/service/task/Task";
import {PromiseBoardTable} from "./js/service/task/PromiseBoardTable";
import {Communication} from "./js/communication/Communication";
import {Analysis} from "./js/analysis/Analysis";
import {Statistics} from "./js/analysis/Statistics";
import {Administrator} from "./js/admin/Administrator";
import {Support} from "./js/account/Support";
import {DashboardMain} from "./js/service/dashboard/DashboardMain";
import TestHeader from "./js/test/TestHeader";
import NotifTest from "./js/test/NotifTest";
import ModalTest from "./js/test/ModalTest";
import RefTest from "./js/test/RefTest";
import MultipartTest from "./js/test/MultipartTest";
import ChartJsTest from "./js/test/ChartJsTest";
import ExcelTest from "./js/test/ExcelTest";
import BulkUploadTest from "./js/test/BulkUploadTest";
import {RegexTest} from "./js/test/RegexTest";
import ApiTest from "./js/test/ApiTest";
import ExceptionTest from "./js/test/ExceptionTest";
import FileUploadTest from "./js/test/FileUploadTest";
import CalendarTest from "./js/test/CalendarTest";
import AlimTalkTest from "./js/test/AlimTalkTest";
import {CssTest} from "./js/test/CssTest";
import {LandingPage} from "./js/landing/LandingPage";
import {ChatBotButton} from "./js/common/module/ChatBotButton";
import {GraphTest} from "./js/test/GraphTest";
import {MasterData} from "./js/admin/MasterData";
import {ErrorBoundary} from "react-error-boundary";
import {AsyncTest} from "./js/test/AsyncTest";
import {Allowance} from "./js/layout/Allowance";
import useUserInfo from "./js/hook/useUserInfo";
import {AdminLayout} from "./js/layout/AdminLayout";
import {VOTest} from "./js/test/VOTest";
import {AutoLogout} from "./js/layout/AutoLogout";
import {MasterShop} from "./js/admin/MasterShop";
import {EventTest} from "./js/test/EventTest";
import {RegisterBrNo} from "./js/shop/RegisterBrNo";
import {ComponentTest} from "./js/test/ComponentTest";
import {StudyMain} from "./js/study_private/StudyMain";
import {StudyLayout} from "./js/study_private/StudyLayout";

function App() {
    const userInfo = useUserInfo();
  return (
      <div className="App">
          <Helmet>
              <title>모모</title>
              <meta name='viewport' content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          </Helmet>
          <ModalContainer/>
          <Routes>
              <Route path='/study' element={<StudyLayout/>}>
                  <Route path='' element={<StudyMain/>}/>
              </Route>

              <Route path='/test' element={<TestHeader/>}>
                  <Route path='notify' element={<NotifTest/>}/>
                  <Route path='modal' element={<ModalTest/>}/>
                  <Route path='ref' element={<RefTest/>}/>
                  <Route path='multipart' element={<MultipartTest/>}/>
                  <Route path='calendar' element={<CalendarTest/>}/>
                  <Route path='graph' element={<GraphTest/>}/>
                  <Route path='excel' element={<ExcelTest/>}/>
                  <Route path='bulk' element={<BulkUploadTest/>}/>
                  <Route path='regex' element={<RegexTest/>}/>
                  <Route path='api' element={<ApiTest/>}/>
                  <Route path='exception' element={<ExceptionTest/>}/>
                  <Route path='file' element={<FileUploadTest/>}/>
                  <Route path='css' element={<CssTest/>}/>
                  <Route path='alimtalk' element={<AlimTalkTest/>}/>
                  <Route path='async' element={<AsyncTest/>}/>
                  <Route path='event' element={<EventTest/>}/>
                  <Route path='vo' element={<VOTest/>}/>
                  <Route path='component' element={<ComponentTest/>}/>
              </Route>


              <Route path='/' element={<LandingPage/>}/>

              <Route element={<ChatBotButton/>}>
                  <Route element={
                      <AccountLayout>
                        <AutoLogout/>
                      </AccountLayout>
                  }>
                      {/*<Route path='/' element={<Preview/>}/>*/}
                      <Route path='/account/login' element={<Login/>}/>
                      <Route path='/account/signup' element={<Signup/>}/>

                      <Route path='/account/find-username' element={<FindUsername/>}/>
                      <Route path='/account/find-password' element={<FindPassword/>}/>
                      <Route path='/support' element={<Support/>}/>
                  </Route>

                  {/*<Route path='/role' element={<Role/>}/>*/}


                  <Route element={
                      <Authorization redirectTo='/account/login'>
                          <AccountLayout/>
                      </Authorization>
                  }>
                      {/*<Route path='/role/staff' element={<SelectShop/>}/>*/}
                      {/*<Route path='/role/reps' element={<RegisterCorp/>}/>*/}
                      <Route path='/shop'>
                          <Route path='register' element={<RegisterShop/>}/>
                          <Route path='brno' element={<RegisterBrNo/>}/>
                          <Route path='list' element={<SelectShop/>}/>
                      </Route>
                  </Route>

                  <Route element={
                      <Authorization redirectTo='/account/login'>
                          <Allowance condition={()=>{
                              return userInfo.curr_shop_id === -1
                          }} redirectTo='/service'>
                              <AdminLayout/>
                          </Allowance>
                      </Authorization>
                  }>
                      <Route path='/admin'>
                          <Route path='' element={<Administrator/>}/>
                          <Route path='gmd' element={<MasterData/>}/>
                          <Route path='shop' element={<MasterShop/>}/>
                      </Route>
                  </Route>

                  <Route element={
                      <Authorization redirectTo='/account/login'>
                          <Allowance condition={()=>{
                              return userInfo.curr_shop_id !== -1
                          }} redirectTo='/admin'>
                              <MainLayout/>
                          </Allowance>
                      </Authorization>
                  }>
                      <Route path='/service'>
                          <Route path='' element={<DashboardMain/>}/>
                          <Route path='sale' element={<Sale/>}/>
                          <Route path='task/*' element={<Task/>}/>
                          <Route path='communication' element={<Communication/>}/>
                          <Route path='analysis' element={<Analysis/>}/>
                          {/*<Route path='statistics' element={<Statistics/>}/>*/}
                      </Route>

                      <Route path='/staff' element={<ManageStaff/>}/>

                      <Route path='/profile' element={<Profile/>}/>

                  </Route>
              </Route>



          </Routes>

      </div>
  )
}

export default App;
