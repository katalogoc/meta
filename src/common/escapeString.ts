export function escapeString(str: string) {
  return str.replace(/["\0\x08\x09\x1a\n\r"'\\\%]/g, (char: string) => {
    switch (char) {
      case '"':
        return '\\"';
      case '\x08':
        return '\\b';
      case '\x09':
        return '\\t';
      case '\x1a':
        return '\\z';
      case '\n':
        return '\\n';
      case '\r':
        return '\\r';
      case '\"':
      case '\'':
      case '\\':
      case '%':
        return '\\' + char; // prepends a backslash to backslash, percent,
      // and double/single quotes
      default:
        return char;
    }
  });
}