import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextVitals,
  {
    // eslint-config-next 16 에서 새로 추가된 규칙. 기존 코드는 경고로만 표시
    rules: { 'react-hooks/set-state-in-effect': 'warn' },
  },
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
