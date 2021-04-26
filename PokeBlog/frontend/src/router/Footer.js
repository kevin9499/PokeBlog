import React from 'react';
import { HeartTwoTone } from '@ant-design/icons';

export default function Footer(props) {
  return (
      <div className="footer mt-5">
        <p>Blog &copy; 2021 &bull; built with <HeartTwoTone twoToneColor="#eb2f96" /> in Paris, Image can be copyrighted.</p>
      </div>
  );
}