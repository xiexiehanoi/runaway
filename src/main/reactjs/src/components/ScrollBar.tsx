import React, { useState, useEffect, useRef } from 'react';

const ScrollBar = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbHeight, setThumbHeight] = useState(20);

  function handleResize(ref: HTMLDivElement, trackSize: number) {
    const { clientHeight, scrollHeight } = ref;
    setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
  }

  // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const { clientHeight: trackSize } = scrollTrackRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });
      observer.current.observe(ref);
      return () => {
        observer.current?.unobserve(ref);
      };
    }
  }, []);

  return (
    <div className="custom-scrollbars__scrollbar">
      <button className="custom-scrollbars__button">⇑</button>
      <div className="custom-scrollbars__track-and-thumb">
        <div className="custom-scrollbars__track"></div>
        <div
          className="custom-scrollbars__thumb"
          ref={scrollThumbRef}
          style={{
            height: `${thumbHeight}px`,
          }}
        ></div>
      </div>
      <button className="custom-scrollbars__button">⇓</button>
    </div>
  );
};

export default ScrollBar;