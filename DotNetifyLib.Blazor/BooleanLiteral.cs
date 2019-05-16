namespace DotNetify.Blazor
{
    public class BooleanLiteral
    {
        private bool _value;

        public BooleanLiteral()
        {
        }

        public BooleanLiteral(bool value)
        {
            _value = value;
        }

        public void Toggle()
        {
            _value = !_value;
        }

        public static BooleanLiteral operator !(BooleanLiteral o) => new BooleanLiteral(!o._value);

        public static implicit operator bool(BooleanLiteral o) => o._value;

        public static implicit operator BooleanLiteral(bool value) => new BooleanLiteral(value);

        public static implicit operator string(BooleanLiteral o) => o._value.ToString().ToLower();

        public override string ToString() => this;
    }
}