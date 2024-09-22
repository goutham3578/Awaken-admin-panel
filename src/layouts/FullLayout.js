import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import Header from './header/Header';
import Customizer from './customizer/Customizer';
import Sidebar from './sidebars/vertical/Sidebar';
import HorizontalHeader from './header/HorizontalHeader';
import HorizontalSidebar from './sidebars/horizontal/HorizontalSidebar';

const FullLayout = () => {
  const customizerToggle = useSelector((state) => state.customizer.customizerSidebar);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const showMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const LayoutHorizontal = useSelector((state) => state.customizer.isLayoutHorizontal);
  const isFixedSidebar = useSelector((state) => state.customizer.isSidebarFixed);
  const data = localStorage.getItem('user');
  const host="https://awaken-app.vercel.app"


  const handleCopyClick = () => {
    // Create a textarea element to temporarily hold the text
    const textarea = document.createElement('textarea');
    textarea.value = host;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the text in the textarea and copy it to the clipboard
    textarea.select();
    document.execCommand('copy');

    // Remove the textarea from the document
    document.body.removeChild(textarea);
    alert('Id copied !!!');
    
  };


  const location = useLocation();
  let getTitle = location.pathname.split('/')[2];
  if(getTitle === "minimal"){
    getTitle="metrics";
  }

  console.log(getTitle);

  return (
    <main>
      <div
        className={`pageWrapper d-md-block d-lg-flex ${toggleMiniSidebar ? 'isMiniSidebar' : ''}`}
      >
        {/******** Sidebar **********/}
        {LayoutHorizontal ? (
          ''
        ) : (
          <aside className={`sidebarArea ${showMobileSidebar ? 'showSidebar' : ''}`}>
            <Sidebar />
          </aside>
        )}
        {/********Content Area**********/}

        <div className={`contentArea ${topbarFixed ? 'fixedTopbar' : ''}`}>
          {/********header**********/}
          {LayoutHorizontal ? <HorizontalHeader /> : <Header />}
          {LayoutHorizontal ? <HorizontalSidebar /> : ''}
          {/********Middle Content**********/}
          <div className={isFixedSidebar && LayoutHorizontal ? 'HsidebarFixed' : ''}>
            <div className="bg-body-bg p-3 ">
              <Container fluid className="boxContainer d-flex w-100  justify-content-between align-items-center">
                {/* <h5 className="fw-medium mb-0 text-capitalize ">{getTitle}</h5> */}
                {/* <div  class="copy d-flex align-items-center border rounded-lg py-2" >
                  <div class="">
                    <div class="d-flex gap-1">
                      <span id="myInput" class="w-100 break-all">
                        {host}
                      </span>
                    </div>
                  </div>
                  <div
                    class="d-flex gap-0.5 w-100 cursor-pointer align-items-center justify-content-end text-muted hover-text-gray-400 "
                    onClick={handleCopyClick}
                  >
                    <span class="w-5 h-5">copy</span>
                  </div>
                </div> */}
              </Container>
            </div>
          </div>

          <Container fluid className="p-4 boxContainer rounded-3 mt-5">
            <div>
              <Outlet />
            </div>
            <Customizer className={customizerToggle ? 'showCustomizer' : ''} />
            {showMobileSidebar || customizerToggle ? <div className="sidebarOverlay" /> : ''}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
