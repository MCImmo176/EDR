import React, { useEffect, useRef, useState } from 'react';

interface SnakeRectangleAnimationProps {
  backgroundColor?: string;
  textLine1?: string;
  textLine2?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

const SnakeRectangleAnimation: React.FC<SnakeRectangleAnimationProps> = ({ 
  backgroundColor = '#333', 
  textLine1 = 'Votre villa', 
  textLine2 = 'vous attend',
  fontFamily = 'Arial, sans-serif',
  fontSize = '3rem',
  fontWeight = 'bold',
  letterSpacing = '1px',
  lineHeight = '1.2'
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [visibleIndexes1, setVisibleIndexes1] = useState<number>(-1);
  const [visibleIndexes2, setVisibleIndexes2] = useState<number>(-1);
  
  const topBorderRef = useRef<HTMLDivElement>(null);
  const rightBorderRef = useRef<HTMLDivElement>(null);
  const bottomBorderRef = useRef<HTMLDivElement>(null);
  const leftBorderRef = useRef<HTMLDivElement>(null);
  const textContent1Ref = useRef<HTMLSpanElement>(null);
  const textContent2Ref = useRef<HTMLSpanElement>(null);
  
  const animateTopBorder = () => {
    return new Promise<void>(resolve => {
      const topBorder = topBorderRef.current;
      if (!topBorder) return resolve();
      
      let width = 0;
      const interval = setInterval(() => {
        width += 2;
        topBorder.style.width = `${width}%`;
        if (width >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 1);
    });
  };
  
  const animateRightBorder = () => {
    return new Promise<void>(resolve => {
      const rightBorder = rightBorderRef.current;
      if (!rightBorder) return resolve();
      
      let height = 0;
      const interval = setInterval(() => {
        height += 2;
        rightBorder.style.height = `${height}%`;
        if (height >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 1);
    });
  };
  
  const animateBottomBorder = () => {
    return new Promise<void>(resolve => {
      const bottomBorder = bottomBorderRef.current;
      if (!bottomBorder) return resolve();
      
      let width = 0;
      const interval = setInterval(() => {
        width += 2;
        bottomBorder.style.width = `${width}%`;
        bottomBorder.style.right = 'auto';
        bottomBorder.style.left = `${100 - width}%`;
        if (width >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 1);
    });
  };
  
  const animateLeftBorder = () => {
    return new Promise<void>(resolve => {
      const leftBorder = leftBorderRef.current;
      if (!leftBorder) return resolve();
      
      let height = 0;
      const interval = setInterval(() => {
        height += 2;
        leftBorder.style.height = `${height}%`;
        leftBorder.style.bottom = 'auto';
        leftBorder.style.top = `${100 - height}%`;
        if (height >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 1);
    });
  };
  
  const animateTextLine = (textRef: React.RefObject<HTMLSpanElement>) => {
    return new Promise<void>(resolve => {
      const textContent = textRef.current;
      if (!textContent) return resolve();
      
      textContent.style.overflow = 'hidden';
      textContent.style.width = 'auto';
      textContent.style.maxWidth = '0';
      textContent.style.transition = 'max-width 0.7s cubic-bezier(0.4,0,0.2,1)';
      const fullWidth = textContent.scrollWidth;
      setTimeout(() => {
        textContent.style.maxWidth = fullWidth + 'px';
      }, 10);
      setTimeout(() => {
        textContent.style.maxWidth = 'none';
        resolve();
      }, 800);
    });
  };
  
  const animateText = async () => {
    await animateTextLine(textContent1Ref);
    await new Promise<void>(resolve => setTimeout(resolve, 200));
    await animateTextLine(textContent2Ref);
  };
  
  const playAnimation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (topBorderRef.current) topBorderRef.current.style.width = '0';
    if (rightBorderRef.current) rightBorderRef.current.style.height = '0';
    
    if (bottomBorderRef.current) {
      bottomBorderRef.current.style.width = '0';
      bottomBorderRef.current.style.left = 'auto';
      bottomBorderRef.current.style.right = '0';
    }
    
    if (leftBorderRef.current) {
      leftBorderRef.current.style.height = '0';
      leftBorderRef.current.style.top = 'auto';
      leftBorderRef.current.style.bottom = '0';
    }
    
    if (textContent1Ref.current) textContent1Ref.current.style.transform = 'translateX(-100%)';
    if (textContent2Ref.current) textContent2Ref.current.style.transform = 'translateX(-100%)';
    
    await animateTopBorder();
    await animateRightBorder();
    await animateBottomBorder();
    await animateLeftBorder();
    await animateText();
    
    setIsAnimating(false);
  };
  
  useEffect(() => {
    if (isInitialLoad) {
      playAnimation();
      setIsInitialLoad(false);
    }
    setVisibleIndexes1(-1);
    setVisibleIndexes2(-1);
    const total1 = textLine1.length;
    const total2 = textLine2.length;
    let i = 0;
    const interval1 = setInterval(() => {
      setVisibleIndexes1((prev) => {
        if (prev < total1 - 1) return prev + 1;
        clearInterval(interval1);
        let j = 0;
        const interval2 = setInterval(() => {
          setVisibleIndexes2((prev2) => {
            if (prev2 < total2 - 1) return prev2 + 1;
            clearInterval(interval2);
            return prev2;
          });
          j++;
        }, 30);
        return prev;
      });
      i++;
    }, 30);
    return () => {
      clearInterval(interval1);
    };
  }, [textLine1, textLine2]);

  // Style pour l'effet accordéon
  const getLetterStyle = (index: number, visibleIndex: number, isFirstLine: boolean) => ({
    opacity: index <= visibleIndex ? 1 : 0,
    transform: index <= visibleIndex 
      ? 'translateX(0) scale(1)' 
      : `translateX(-50px) scale(0.8)`,
    display: 'inline-block',
    transition: `opacity 0.2s cubic-bezier(0.2,0.8,0.4,1) ${index * 0.05}s, 
                transform 0.3s cubic-bezier(0.2,0.8,0.4,1) ${index * 0.05}s`,
    transformOrigin: 'right center',
    willChange: 'transform, opacity'
  });

  return (
    <>
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'relative',
            width: '300px',
            height: '405px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
          }}
        >
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <div 
              ref={topBorderRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '5px',
                width: 0,
                backgroundColor: '#F5CFBA'
              }}
            />
            <div 
              ref={rightBorderRef}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '5px',
                height: 0,
                backgroundColor: '#F5CFBA'
              }}
            />
            <div 
              ref={bottomBorderRef}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                height: '5px',
                width: 0,
                backgroundColor: '#F5CFBA'
              }}
            />
            <div 
              ref={leftBorderRef}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '5px',
                height: 0,
                backgroundColor: '#F5CFBA'
              }}
            />
          </div>
          <div 
            style={{
              position: 'absolute',
              top: '40%',
              left: '0',
              transform: 'translateY(-50%)',
              width: '900px',
              paddingRight: '0',
              paddingLeft: '15%',
              zIndex: 10,
              pointerEvents: 'auto',
              overflow: 'visible',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              minWidth: 0,
            }}
          >
            <div 
              style={{
                fontSize: '80px',
                fontWeight: 700,
                color: 'white',
                textTransform: 'none',
                letterSpacing: '1px',
                lineHeight: 1.05,
                whiteSpace: 'normal',
                margin: '0 0 10px 0', // Ajout de marge entre les lignes
                overflow: 'visible',
                textShadow: '0 2px 16px rgba(0,0,0,0.18)',
                position: 'relative',
                width: '100%',
                maxWidth: '100%',
                textAlign: 'left',
                display: 'block',
                minWidth: 0,
                perspective: '1000px'
              }}
            >
              {textLine1.split('').map((char, idx) => (
                <span
                  key={idx}
                  style={getLetterStyle(idx, visibleIndexes1, true)}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
            <div 
              style={{
                fontSize: '80px',
                fontWeight: 700,
                color: 'white',
                textTransform: 'none',
                letterSpacing: '1px',
                lineHeight: 1.05,
                whiteSpace: 'normal',
                margin: '0',
                overflow: 'visible',
                textShadow: '0 2px 16px rgba(0,0,0,0.18)',
                position: 'relative',
                width: '100%',
                maxWidth: '100%',
                textAlign: 'left',
                display: 'block',
                minWidth: 0,
                perspective: '1000px'
              }}
            >
              {textLine2.split('').map((char, idx) => (
                <span
                  key={idx}
                  style={getLetterStyle(idx, visibleIndexes2, false)}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SnakeRectangleAnimation;