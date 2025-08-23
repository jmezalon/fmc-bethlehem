import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'FMCB';
    const subtitle = searchParams.get('subtitle') || 'Free Methodist Church';
    const type = searchParams.get('type') || 'page';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            backgroundImage:
              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#667eea',
                }}
              >
                FMC
              </span>
            </div>
            <span
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              Bethlehem
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '800px',
              padding: '0 40px',
            }}
          >
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '20px',
                lineHeight: '1.2',
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{
                  fontSize: '32px',
                  color: '#ffffff',
                  opacity: 0.9,
                  margin: 0,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Type Badge */}
          {type !== 'page' && (
            <div
              style={{
                position: 'absolute',
                top: '40px',
                right: '40px',
                backgroundColor: '#ffffff',
                color: '#667eea',
                padding: '12px 24px',
                borderRadius: '20px',
                fontSize: '20px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              {type}
            </div>
          )}

          {/* Bottom Text */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '40px',
              right: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#ffffff',
              opacity: 0.8,
            }}
          >
            <span style={{ fontSize: '20px' }}>Free Methodist Church</span>
            <span style={{ fontSize: '20px' }}>Brooklyn, NY</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
