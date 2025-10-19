import { GraduationCap } from 'lucide-react';
import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'hsl(257 70% 55%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
      >
        <GraduationCap
          style={{
            color: 'white',
          }}
          size={20}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
