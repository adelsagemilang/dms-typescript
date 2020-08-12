import React, { Component } from 'react';
import Header from 'components/header';
import { Container } from 'bloomer';
import 'styles';

class LayoutComponent extends Component<any> {
  render() {
    const {
      children,
      isAdmin,
      router,
      isShowBackButton,
      isShowViewSettings,
      setAdminLayout,
      showBackButton,
    } = this.props;
    const slug = router.location.pathname.replace('/', '');
    return (
      <div className={slug !== '' ? slug : 'summary'}>
        {isAdmin ? (
          <>
            <Header
              isShowBackButton={isShowBackButton}
              isShowViewSettings={isShowViewSettings}
              showBackButton={showBackButton}
              setAdminLayout={setAdminLayout}
            />
            <Container
              isFluid
              className="p-t-75 background-grey main-container"
            >
              {children}
            </Container>
          </>
        ) : (
          <Container>{children}</Container>
        )}
      </div>
    );
  }
}

export default LayoutComponent;
