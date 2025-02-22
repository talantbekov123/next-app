// components/PageFrame.tsx
import { ReactNode } from 'react';
import { Wrapper, Container, Header, LogoWrapper, TextWraper, Title, Subtitle, LeftSide, RightSide } from '../../styles/pages/home';
import { FiDollarSign } from 'react-icons/fi';

interface PageFrameProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  actionButton?: ReactNode;
}

const PageFrame = ({ title, subtitle, children, actionButton }: PageFrameProps) => {
  return (
    <Wrapper>
      <Container>
        <Header>
          <LeftSide>
            <TextWraper>
              <Title>
                <LogoWrapper>
                  <FiDollarSign color="#fff" size={18} />
                </LogoWrapper>
                {title}
              </Title>
              <Subtitle>{subtitle}</Subtitle>
            </TextWraper>
          </LeftSide>
          <RightSide>{actionButton}</RightSide>
        </Header>
        {children}
      </Container>
    </Wrapper>
  );
};

export default PageFrame;