import type { FieldValues, Path, Control, FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";
import type React from "react";
import { type Document } from "mongodb";

declare global {
  // --------------------------------------- TRADING VIEW WIDGETS
  interface TradingViewWidgetProps {
    height?: number;
    scriptScr: string;
    className?: string;
    label: string;
    config: object;
    hideLabel?: boolean;
  }

  type useTradingViewWidgetProps = Pick<TradingViewWidgetProps, 'config' | 'height' | 'scriptScr'>

  // --------------------------------------- AUTH CONTRACT & AUTH UI
  interface DBUser extends Document {
    _id: string;
    id: string | null;
    name: string | null;
    email: string | null;
    country: string | null;
    preferredIndustry: string | null;
    riskTolerance: string | null;
    investmentGoals: string | null;
  }

  type User = {
    id: string;
    name: string;
    email: string;
  };

  type SignInFormData = {
    email: string;
    password: string;
  };

  type SignUpFormData = {
    fullName: string;
    email: string;
    password: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
  };

  // --------------------------------------- UI COMPONENTS 
  type UserAvatarProps = {
    userName: string;
    userImageSrc?: string;
    customClassName?: string;
  }

  type CountrySelectProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    control: Control<T>;
    error?: FieldError;
    required?: boolean;
  };

  interface InputFieldProps<T extends FieldValues> extends React.ComponentProps<"input"> {
    name: Path<T>;
    id?: string;
    label: string;
    placeholder: string;
    type?: string;
    register: UseFormRegister<T>;
    error?: FieldError;
    validation?: RegisterOptions<T, Path<T>>;
    disabled?: boolean;
    value?: string;
  };

  type Option = {
    value: string;
    label: string;
  };

  type SelectFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    placeholder: string;
    options: readonly Option[];
    control: Control<T>;
    error?: FieldError;
    required?: boolean;
  };

  type FooterLinkProps = {
    text: string;
    linkText: string;
    href: string;
  };

  type HeaderUser = Pick<User, 'name' | 'email'>;

  type StockDetailsPageProps = {
    params: Promise<{
      symbol: string;
    }>;
  };

  type WatchlistButtonProps = {
    symbol: string;
    company: string;
    isInWatchlist: boolean;
    showTrashIcon?: boolean;
    type?: 'button' | 'icon';
    onWatchlistChange?: (symbol: string, isAdded: boolean) => void;
  };

  type SearchCommandProps = {
    renderAs?: 'button' | 'text';
    label?: string;
    initialStocks: StockWithWatchlistStatus[];
  };

  type WatchlistTableProps = {
    watchlist: StockWithData[];
  };

  type WatchlistNewsProps = {
    news?: MarketNewsArticle[];
  };

  type SearchCommandProps = {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    renderAs?: 'button' | 'text';
    buttonLabel?: string;
    buttonVariant?: 'primary' | 'secondary';
    className?: string;
  };

  type AlertModalProps = {
    alertId?: string;
    alertData?: AlertData;
    action?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
  };

  type AlertsListProps = {
    alertData: Alert[] | undefined;
  };

  // --------------------------------------- DAILY NEWS DELIVERY
  type WelcomeEmailData = {
    email: string;
    name: string;
    intro: string;
  };

  type Stock = {
    symbol: string;
    name: string;
    exchange: string;
    type: string;
  };

  type StockWithWatchlistStatus = Stock & {
    isInWatchlist: boolean;
  };

  type FinnhubSearchResult = {
    symbol: string;
    description: string;
    displaySymbol?: string;
    type: string;
  };

  type FinnhubSearchResponse = {
    count: number;
    result: FinnhubSearchResult[];
  };

  type QuoteData = {
    c?: number;
    dp?: number;
  };

  type ProfileData = {
    name?: string;
    marketCapitalization?: number;
  };

  type FinancialsData = {
    metric?: { [key: string]: number };
  };

  type SelectedStock = {
    symbol: string;
    company: string;
    currentPrice?: number;
  };

  type StockWithData = {
    userId: string;
    symbol: string;
    company: string;
    addedAt: Date;
    currentPrice?: number;
    changePercent?: number;
    priceFormatted?: string;
    changeFormatted?: string;
    marketCap?: string;
    peRatio?: string;
  };

  type MarketNewsArticle = {
    id: number;
    headline: string;
    summary: string;
    source: string;
    url: string;
    datetime: number;
    category: string;
    related: string;
    image?: string;
  };

  type AlertData = {
    symbol: string;
    company: string;
    alertName: string;
    alertType: 'upper' | 'lower';
    threshold: string;
  };


  type RawNewsArticle = {
    id: number;
    headline?: string;
    summary?: string;
    source?: string;
    url?: string;
    datetime?: number;
    image?: string;
    category?: string;
    related?: string;
  };

  type Alert = {
    id: string;
    symbol: string;
    company: string;
    alertName: string;
    currentPrice: number;
    alertType: 'upper' | 'lower';
    threshold: number;
    changePercent?: number;
  };
}

export { };