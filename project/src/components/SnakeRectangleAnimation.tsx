import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface SnakeRectangleAnimationProps {
  backgroundColor?: string;
  textKey?: string;
  textLine1?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
  highlightWords?: boolean;
}

const SnakeRectangleAnimation: React.FC<SnakeRectangleAnimationProps> = ({ 
  backgroundColor = '#b7a66b', 
  textKey = 'villa',
  textLine1,
  fontFamily = 'Arial, sans-serif',
  fontSize = '3rem',
  fontWeight = 'bold',
  letterSpacing = '1px',
  lineHeight = '1.2',
  highlightWords = true
}) => {
  const t = useTranslations('snakeRectangle');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [visibleIndexes1, setVisibleIndexes1] = useState<number>(-1);
  
  const topBorderRef = useRef<HTMLDivElement>(null);
  const rightBorderRef = useRef<HTMLDivElement>(null);
  const bottomBorderRef = useRef<HTMLDivElement>(null);
  const leftBorderRef = useRef<HTMLDivElement>(null);
  const textContent1Ref = useRef<HTMLSpanElement>(null);
  
  const finalTextLine1 = textLine1 || t(`${textKey}.line1`);
  
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
    const total1 = finalTextLine1.length;
    let i = 0;
    const interval1 = setInterval(() => {
      setVisibleIndexes1((prev) => {
        if (prev < total1 - 1) return prev + 1;
        clearInterval(interval1);
        return prev;
      });
      i++;
    }, 30);
    return () => {
      clearInterval(interval1);
    };
  }, [finalTextLine1]);

  // Style pour l'effet accordéon avec légère amélioration de l'animation
  const getLetterStyle = (index: number, visibleIndex: number) => ({
    opacity: index <= visibleIndex ? 1 : 0,
    transform: index <= visibleIndex 
      ? 'translateY(0) scale(1)' 
      : `translateY(20px) scale(0.9)`,
    display: 'inline-block',
    transition: `opacity 0.3s cubic-bezier(0.4,0,0.2,1) ${index * 0.03}s, 
                transform 0.4s cubic-bezier(0.2,0.8,0.2,1) ${index * 0.03}s`,
    transformOrigin: 'center bottom',
    willChange: 'transform, opacity',
    textShadow: '0 2px 10px rgba(0,0,0,0.15)'
  });

  // Fonction pour déterminer si un mot doit être mis en évidence
  const shouldHighlightWord = (word: string): boolean => {
    if (!highlightWords) return false;
    // Liste des mots clés à mettre en évidence
    const highlightKeywords = ['unique', 'exception', 'exceptionnel', 'exceptionnelle', 'unique', 'inoubliable'];
    return highlightKeywords.some(keyword => word.toLowerCase().includes(keyword.toLowerCase()));
  };

  // Fonction pour grouper les caractères par mots
  const groupCharactersByWord = (text: string) => {
    const words = text.split(' ');
    let currentIndex = 0;
    return words.map((word, wordIndex) => {
      const characters = word.split('').map((char, charIndex) => ({
        char,
        index: currentIndex + charIndex
      }));
      currentIndex += word.length + 1; // +1 pour l'espace
      return {
        word,
        characters,
        startIndex: currentIndex - word.length - 1,
        endIndex: currentIndex - 1,
        highlight: shouldHighlightWord(word)
      };
    });
  };

  const words = groupCharactersByWord(finalTextLine1);

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
                backgroundColor: backgroundColor,
                boxShadow: '0 0 10px rgba(183, 166, 107, 0.5)'
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
                backgroundColor: backgroundColor,
                boxShadow: '0 0 10px rgba(183, 166, 107, 0.5)'
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
                backgroundColor: backgroundColor,
                boxShadow: '0 0 10px rgba(183, 166, 107, 0.5)'
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
                backgroundColor: backgroundColor,
                boxShadow: '0 0 10px rgba(183, 166, 107, 0.5)'
              }}
            />
          </div>
          <div 
            style={{
              position: 'absolute',
              top: '50%',
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
            <motion.div 
              style={{
                fontSize,
                fontWeight,
                color: 'white',
                textTransform: 'none',
                letterSpacing,
                lineHeight,
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.2em',
                    position: 'relative'
                  }}
                >
                  {word.characters.map(({ char, index }) => (
                    <span
                      key={index}
                      style={{
                        ...getLetterStyle(index, visibleIndexes1),
                        color: word.highlight ? backgroundColor : 'white',
                        fontWeight: word.highlight ? '700' : fontWeight
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                  {word.highlight && (
                    <motion.span
                      style={{
                        position: 'absolute',
                        bottom: '-3px',
                        left: '0',
                        width: '100%',
                        height: '3px',
                        backgroundColor: backgroundColor,
                        borderRadius: '2px',
                        opacity: 0
                      }}
                      animate={{ opacity: [0, 1, 1] }}
                      transition={{ 
                        duration: 1.5, 
                        delay: (words.length * 0.05) + 0.5,
                        times: [0, 0.8, 1]
                      }}
                    />
                  )}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SnakeRectangleAnimation;