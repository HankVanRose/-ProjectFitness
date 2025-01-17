import React from 'react';
import video from '/mainpage.mp4';

export default function MainVideo() {
  return (
 <>
      <div
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              fontWeight: '700',
              textShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Welcome to BE FIT
          </h1>
          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              fontStyle: 'italic',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            }}
          >
            your journey to fitness begins here
          </p>
        </div>
      </div>
 </>
  );
}
