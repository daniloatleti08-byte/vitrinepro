# Kit Vitrine Beauty Pro — Página de vendas

Página estática otimizada para publicação via GitHub + Vercel.

## Configuração obrigatória

Edite `site-config.js` e preencha:

- `metaPixelId`: ID numérico do Pixel da Meta.
- `checkoutUrl`: link completo da página de pagamento.

Os botões registram `InitiateCheckout` e preservam automaticamente UTMs e `fbclid` ao encaminhar para o checkout. O Pixel também registra `PageView` e `ViewContent`.

## Teste local

```bash
python3 -m http.server 8080
```

Acesse `http://localhost:8080`.

## Publicação no Vercel

1. Crie um repositório no GitHub e envie todos os arquivos desta pasta.
2. No Vercel, escolha **Add New > Project** e importe o repositório.
3. Selecione **Framework Preset: Other**.
4. Não é necessário comando de build nem pasta de saída.
5. Clique em **Deploy**.

## Eventos do Pixel

- `PageView`: carregamento da página.
- `ViewContent`: visualização do produto.
- `InitiateCheckout`: clique em qualquer botão de compra.
- `CTA_Click`: evento personalizado com a posição do botão.

O evento `Purchase` deve ser configurado na página de confirmação do checkout, pois somente o checkout sabe quando o pagamento foi realmente aprovado.
